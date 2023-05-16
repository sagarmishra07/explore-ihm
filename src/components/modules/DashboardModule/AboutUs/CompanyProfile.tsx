import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {firebaseGet, firebaseStore} from "@/api/firebase";
import showNotify from "@/utils/notify";
import {Controller, useForm} from "react-hook-form";
import CommonHead from "@/components/common/CommonHead";
import FormTitle from "@/components/common/FormTitle";
import {Button} from "@mantine/core";
import dynamic from "next/dynamic";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import {CompanyProfileDTO} from "@/utils/formatters/CompanyProfileDTO";

const firebaseUrl = 'AboutUs/CompanyProfile';
const RichTextEditor = dynamic(import('@mantine/rte'), {
    ssr: false,
    loading: () => null,
});

function CompanyProfile() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const getAllData = async () => {
        setLoading(true);
        const res: any = await firebaseGet(firebaseUrl);
        // const formatted: any = FirebaseDTO.receive(res);
        const afterFormat = CompanyProfileDTO.receive(res);
        setValue("description", afterFormat?.description)
        setLoading(false)
    }


    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {

            description: ""

        },
        mode: 'onChange',
    });


    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllData().then(r => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady])

    const onSubmit = async (values: any) => {
        try {
            setLoading(true);
            const formatted: any = CompanyProfileDTO.create(values);
            await firebaseStore(firebaseUrl, formatted);
            showNotify('success', "Updated Successfully")

            setLoading(false)

        } catch (e: any) {
            showNotify("error", e)
        }
    }


    return (
        <>
            {!loading ? (
                    <main className={'dynamic-y-padding dynamic-x-padding'}>
                        <CommonHead title={"Explore IMH"}/>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <section className={'grid grid-cols-12 gap-4 sm:gap-10'}>
                                <article className={'col-span-12 grid gap-4'}>


                                    <div className={'col-span-12 md:col-span-12 '}>
                                        <FormTitle isRequired={true} title={'Description'}/>
                                        <div>
                                            <Controller
                                                name={'description'}
                                                control={control}
                                                rules={{
                                                    required: 'Required',
                                                }}
                                                render={({field: {value, onChange}}) => (
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


                                <article
                                    className={
                                        'col-span-12   '
                                    }
                                >
                                    <div className={'flex justify-end gap-3'}>

                                        <Button size={'lg'} type={'submit'} disabled={loading}>
                                            Save
                                        </Button>
                                    </div>
                                </article>
                            </section>
                        </form>
                    </main>
                ) :
                (
                    <div className={'flex justify-center dynamic-y-padding'}>Loading...</div>
                )}
        </>

    )
}

CompanyProfile.Layout = AdminDashboardLayout;
export default CompanyProfile