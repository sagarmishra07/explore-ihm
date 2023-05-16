import CommonHead from "@/components/common/CommonHead";
import AdminDashboardLayout from "../../../../layouts/AdminDashboardLayout";
import React, { useState } from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Rating, TextInput} from "@mantine/core";
import dynamic from 'next/dynamic';

import {useRouter} from "next/router";
import showNotify from "@/utils/notify";
import CommonDivider from "@/components/common/CommonDivider";
import FormTitle from "@/components/common/FormTitle";
import ImageUpload from "@/components/common/ImageUpload";
import {firebasePush} from "@/api/firebase";
import {TestimonialDTO} from "@/utils/formatters/TestimonialDTO";

const RichTextEditor = dynamic(import('@mantine/rte'), {
    ssr: false,
    loading: () => null,
});

const firebaseUrl = 'landing/Testimonial';
const Add = () => {

    const [loading,setLoading] = useState<boolean>(false);

    const handleLoading =(condition:any)=>{
        setLoading(condition)
    }

    const router = useRouter();
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            student_name:"",
            rating:0,
            imageUrl:"",
            description:""


        },
        mode: 'onChange',
    });

    const onSubmit = async (values: any) => {

try{
    setLoading(true);
    const formatted:any = TestimonialDTO.create(values);
    await  firebasePush(firebaseUrl,formatted);
    showNotify("success","Testimonial Added")
    setLoading(false)
    router.back();

}    catch (e:any) {
        showNotify("error",e?.message);
        setLoading(false)
}
    };



    return (
        <>
            <CommonHead title={"Explore IMH | Add Testimonial"} />
            <main className={'dynamic-y-padding'}>
                <div className={'py-3'}>
                    <CommonDivider/>

                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <section className={'grid grid-cols-12 gap-4 sm:gap-10'}>
                        <article className={'col-span-6 grid gap-4'}>

                            <div className={'col-span-12 md:col-span-6'}>

                                <FormTitle isRequired={true}   title={'Title'} />
                                <div>
                                    <Controller
                                        name={'student_name'}
                                        control={control}
                                        rules={{
                                            required: 'Required',
                                        }}
                                        // defaultValue={'4567'}
                                        render={({ field }) => (
                                            <TextInput
                                                {...field}
                                                type={'text'}
                                                // variant={'filled'}
                                                size={'lg'}
                                                placeholder="Member Name"
                                                error={errors.student_name?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className={'col-span-12 md:col-span-6'}>

                                <FormTitle isRequired={true}   title={'Position'} />
                                <div>
                                    <Controller
                                        name={'rating'}
                                        control={control}
                                        rules={{
                                            required: 'Required',
                                        }}
                                        // defaultValue={'4567'}
                                        render={({ field }) => (

                                            <Rating defaultValue={2}      {...field}/>
                                        )}
                                    />
                                </div>
                            </div>










                            <div className={'col-span-12 md:col-span-12 '}>
                                <FormTitle isRequired={true}   title={'Description'} />
                                <div>
                                    <Controller
                                        name={'description'}
                                        control={control}
                                        rules={{
                                            required: 'Required',
                                        }}
                                        render={({ field: { value, onChange } }) => (
                                            <RichTextEditor
                                                value={value}
                                                onChange={onChange}
                                            ></RichTextEditor>
                                        )}
                                    />

                                    <div className={'text-primary'}> {errors.description?.message}</div>
                                </div>
                            </div>

                        </article>
                        <article className={'col-span-6 grid justify-between'}>


                            <div className={'col-span-12 md:col-span-6 pb-2'}>
                                <FormTitle isRequired={true}  title={'Upload Image '} />

                                <ImageUpload
                                    control={control}
                                    setValue={setValue}
                                    getValues={getValues}
                                    errors={errors}
                                    value={'imageUrl'}
                                    url={'Testimonial'}
                                    handleLoading={handleLoading}

                                />


                            </div>

                        </article>

                        <article
                            className={
                                'col-span-12    '
                            }
                        >
                            <div className={'flex justify-end gap-3'}>
                                <Button size={'lg'} color={'red'}  variant={'outline'} onClick={()=>router.back()}>
                                    Cancel
                                </Button>
                                <Button size={'lg'} type={'submit'} disabled={loading} >
                                    Add
                                </Button>
                            </div>
                        </article>
                    </section>
                </form>
            </main>

        </>
    );
};

Add.Layout = AdminDashboardLayout;
export default Add;
