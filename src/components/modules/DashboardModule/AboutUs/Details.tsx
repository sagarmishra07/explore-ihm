import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {firebaseGet, firebaseStore} from "@/api/firebase";
import showNotify from "@/utils/notify";
import {Controller, useForm} from "react-hook-form";
import CommonHead from "@/components/common/CommonHead";
import FormTitle from "@/components/common/FormTitle";
import {Button, TextInput} from "@mantine/core";

import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";

import {DetailsDTO} from "@/utils/formatters/DetailsDTO";

const firebaseUrl = 'landing/Details';

function Details() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const getAllData = async () => {
        setLoading(true);
        const res: any = await firebaseGet(firebaseUrl);
        // const formatted: any = FirebaseDTO.receive(res);
        const afterFormat = DetailsDTO.receive(res);
        setValue("email", afterFormat?.email)

        setValue("whatsApp", afterFormat?.whatsApp)

        setValue("phone", afterFormat?.phone)
        setValue("address", afterFormat?.address)

        setLoading(false)
    }


    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: "",
            whatsApp: "",
            phone: "",
            address: ""

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
            const formatted: any = DetailsDTO.create(values);
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


                                    <div className={'col-span-12 md:col-span-6'}>

                                        <FormTitle isRequired={true} title={'Email'}/>
                                        <div>
                                            <Controller
                                                name={'email'}
                                                control={control}
                                                rules={{
                                                    required: 'Required',
                                                }}
                                                // defaultValue={'4567'}
                                                render={({field}) => (
                                                    <TextInput
                                                        {...field}
                                                        type={'email'}
                                                        // variant={'filled'}
                                                        size={'lg'}
                                                        placeholder="Email"
                                                        error={errors.email?.message}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>


                                    <div className={'col-span-12 md:col-span-6'}>

                                        <FormTitle isRequired={true} title={'whatsApp'}/>
                                        <div>
                                            <Controller
                                                name={'whatsApp'}
                                                control={control}
                                                rules={{
                                                    required: 'Required',
                                                }}
                                                // defaultValue={'4567'}
                                                render={({field}) => (
                                                    <TextInput
                                                        {...field}
                                                        type={'text'}
                                                        // variant={'filled'}
                                                        size={'lg'}
                                                        placeholder="whatsApp"
                                                        error={errors.whatsApp?.message}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className={'col-span-12 md:col-span-6'}>

                                        <FormTitle isRequired={true} title={'Phone Number'}/>
                                        <div>
                                            <Controller
                                                name={'phone'}
                                                control={control}
                                                rules={{
                                                    required: 'Required',
                                                }}
                                                // defaultValue={'4567'}
                                                render={({field}) => (
                                                    <TextInput
                                                        {...field}
                                                        type={'text'}
                                                        // variant={'filled'}
                                                        size={'lg'}
                                                        placeholder="Phone Number"
                                                        error={errors.phone?.message}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>


                                    <div className={'col-span-12 md:col-span-6'}>

                                        <FormTitle isRequired={true} title={'Address'}/>
                                        <div>
                                            <Controller
                                                name={'address'}
                                                control={control}
                                                rules={{
                                                    required: 'Required',
                                                }}
                                                // defaultValue={'4567'}
                                                render={({field}) => (
                                                    <TextInput
                                                        {...field}
                                                        type={'text'}
                                                        // variant={'filled'}
                                                        size={'lg'}
                                                        placeholder="Address"
                                                        error={errors.address?.message}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>


                                </article>


                                <article
                                    className={
                                        'col-span-12  '
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

Details.Layout = AdminDashboardLayout;
export default Details