import CommonHead from "@/components/common/CommonHead";
import React, { useState } from "react";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {ActionIcon, Button,  TextInput} from "@mantine/core";

import CommonDivider from "@/components/common/CommonDivider";
import FormTitle from "@/components/common/FormTitle";
import {IconPlus, IconTrash} from "@tabler/icons";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import ImageUpload from "@/components/common/ImageUpload";
import showNotify from "@/utils/notify";
import {useRouter} from "next/router";
import {firebasePush} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";


const firebaseUrl = 'landing/Album'
const Add = () => {
const router = useRouter();
    const [loading,setLoading] = useState<boolean>(false);

    const handleLoading =(condition:any)=>{
        setLoading(condition)
    }

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
           album_title:"",
            gallery: [],


        },
        mode: 'onChange',
    });


    // @ts-ignore
    // @ts-ignore
    const {append, fields, remove} = useFieldArray<any>({
        control,
        name: 'gallery',
    });

    const handleAppend = () => {


        append({
            imageUrl: ""
        });
    };
    const galleryData = watch('gallery');


    const onSubmit = async (values: any) => {
    const {album_title,gallery} = values;
try{
    setLoading(true);
    const res =   await  firebasePush(firebaseUrl, {album_title});

  if(galleryData.length !==0) {
      for(let data of gallery){
          await firebasePush(`${firebaseUrl}/${res}/gallery`,data);
      }
  }
    showNotify("success","Album Created")
    setLoading(false)
    router.back();

}    catch (e:any) {
        showNotify("error",e?.message);
        setLoading(false)
}
    };



    return (
        <>
            <CommonHead title={"Explore IMH | Add Album"} />
            <main className={'dynamic-y-padding'}>
                <div className={'py-3'}>
                    <CommonDivider/>

                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className={'grid grid-cols-12 gap-5 sm:gap-10'}>
                        <div className={'col-span-12 md:col-span-6'}>
                            <div className={'grid grid-cols-12 gap-5 sm:gap-10'}>
                                <div className={'col-span-12 md:col-span-12'}>
                                    <FormTitle isRequired={true} title={'Album Title'} />
                                    <div>
                                        <Controller
                                            name={`album_title`}
                                            control={control}
                                            rules={{
                                                required: 'Required',
                                            }}
                                            defaultValue={''}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    // variant={'filled'}
                                                    size={'lg'}
                                                    placeholder="Enter title"
                                                    error={errors?.album_title?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>







                            </div>
                        </div>

                    </section>

                    {fields.map((field, idx) => (
                        <section className={'grid grid-cols-12 gap-5 sm:gap-10'} key={idx}>
                            <div className={'col-span-12 pt-12'}>
                                <CommonDivider />
                            </div>

                            <div className={'col-span-12 flex justify-end'}>
                                <div>
                                    <ActionIcon color="red" onClick={() => remove(idx)}>
                                        <IconTrash size={25} />
                                    </ActionIcon>
                                </div>
                            </div>
                            <div className={'col-span-12 md:col-span-6'}>
                                <div className={'grid grid-cols-12 gap-5 sm:gap-10'}>
                                    <div className={'col-span-12 md:col-span-12'}>
                                        <FormTitle isRequired={true} title={'Gallery Image'} />
                                        <div className={'col-span-12'}>
                                            <ImageUpload
                                                control={control}
                                                setValue={setValue}
                                                getValues={getValues}
                                                errors={errors}
                                                value={`gallery[${idx}].imageUrl`}
                                                final={'gallery'}
                                                index={idx}
                                                keys={'imageUrl'}
                                                url={'Gallery'}
                                                handleLoading={handleLoading}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </section>
                    ))}

                    <div className={'col-span-12 flex justify-end py-4'}>
                        <div>
                            <Button
                                leftIcon={<IconPlus size={14} />}
                                variant={'filled'}
                                onClick={handleAppend}
                            >
                                Add Images
                            </Button>
                        </div>
                    </div>
                    <div className={'col-span-12 flex flex-col gap-4 sm:block  text-end pt-6'}>
                        {/*<Button*/}
                        {/*    size={'lg'}*/}
                        {/*    variant={'subtle'}*/}
                        {/*    onClick={form.onSubmit((values: any) => handleDraft(values))}*/}
                        {/*    className={'md:mr-4'}*/}
                        {/*>*/}
                        {/*    {' '}*/}
                        {/*    Save as draft*/}
                        {/*</Button>*/}



                        <Button size={'lg'} type={'submit'} disabled={loading}>
                            Add
                        </Button>
                    </div>
                </form>
            </main>

        </>
    );
};

Add.Layout = AdminDashboardLayout;
export default Add;
