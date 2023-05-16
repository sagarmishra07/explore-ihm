import React, {useEffect, useState} from "react";
import {Button, Divider, Group, Textarea, TextInput} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import {Controller, useForm} from "react-hook-form";
import {IconMail, IconMapPin, IconUsers} from "@tabler/icons";
import {firebaseGet} from "@/api/firebase";
import {useRouter} from "next/router";
import showNotify from "@/utils/notify";
import emailjs from 'emailjs-com';

const Contact = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [recaptchaResponse, setRecaptchaResponse] = useState('');

    const handleRecaptchaChange = (response: any) => {
        setRecaptchaResponse(response);
    };

    const onSubmit = async (values: any) => {
        setLoading(true)

        // if (recaptchaResponse) {
        const serviceId = 'service_vo7q88x';
        const templateId = 'template_m3q5lcp';
        const userId = 'q0EGar9o0mdrf2q3U';

        // @ts-ignore
        await emailjs.send(serviceId, templateId, values, userId).then(
            (result: any) => {
                console.log(result.text);
            },
            (e: any) => {
                console.log(e?.message)
                showNotify("error", e?.message)
            }
        );
        setLoading(false)
        reset()
        // } else {
        //     alert('Please verify that you are not a robot.');
        // }
    };


    const [details, setDetails] = useState<any>({});
    const getAllDetails = async () => {
        const res: any = await firebaseGet(`landing/Details`);
        setDetails(res)

    }
    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllDetails().then(r => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady])
    const {
        control,
        handleSubmit,
        reset,
        getValues,
        formState: {errors},
    } = useForm({
        defaultValues: {
            contact_name: "",
            contact_email: "",
            contact_message: "",
        },
        mode: "onChange",
    });
    // const onSubmit = async (values: any) => {
    //     try {
    //         await firebasePush('/Contact', values)
    //         reset();
    //         showNotify("success", "We will contact you soon....")
    //     } catch (e: any) {
    //         showNotify('error', e?.message)
    //     }
    // };

    return (
        <main className=" mt-16 ">
            {/*<Head>*/}
            {/*<script src="https://www.google.com/recaptcha/api.js"></script>*/}
            {/*</Head>*/}
            <div className="dynamic-x-padding">
                <section className="">
                    <Group>
                        <section>
                            <article className="text-primary uppercase gap-3 font-bold text-lg">
                                Explore IHM
                            </article>
                            <article className="py-3">
                                <div className="w-[16rem] font-extrabold text-4xl uppercase">
                                    Our Contact
                                </div>
                            </article>
                        </section>

                        <Divider orientation="vertical" size={"xl"} color="red"/>
                        <article className="w-[18rem]">
              <span>
               We look forward to hearing from you and helping you achieve 
               your goals in the hospitality industry.
              </span>
                        </article>
                    </Group>
                </section>
                <section className={"md:grid grid-cols-12 gap-4 pt-8"}>
                    <article className="col-span-6">
                        <div className="pb-8">
                            <div className="font-bold text-2xl capitalize">Contact Info</div>
                            <p>If you want to get more info, ping us now.</p>
                        </div>
                        <section className="grid gap-6">
                            <div className="flex items-center">
                                <div>
                                    <IconMapPin size={30} color="red"/>
                                </div>
                                <div className="pl-4">
                                    <div className="font-bold text-2xl">Our Address</div>
                                    <p>{details?.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <IconMail size={30} color="red"/>
                                </div>
                                <div className="pl-4">
                                    <div className="font-bold text-2xl">Email Address</div>
                                    <p>{details?.email}</p>
                                    <p>phone: {details?.phone}</p>
                                    <p>Phone: {details?.whatsApp} </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <IconUsers size={30} color="red" fill="red"/>
                                </div>
                                <div className="pl-4">
                                    <div className="font-bold text-2xl">Our Support</div>
                                    <p>exploreihm@gmail.com</p>
                                    <p>Phone: {details?.whatsApp}</p>
                                </div>
                            </div>
                        </section>
                    </article>
                    <article className="col-span-6 ">
                        <div className="pb-8">
                            <div className="font-extrabold text-3xl uppercase pt-10 md:pt-0">
                                Get in Touch
                            </div>
                            <p>If you want to get more info, ping us now.</p>
                        </div>
                        <div className="bg-grayScale p-10">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <section className={"grid gap-6"}>
                                    <div>
                                        <Controller
                                            name={"contact_name"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            render={({field}) => (
                                                <TextInput
                                                    {...field}
                                                    type={"text"}
                                                    size={"lg"}
                                                    placeholder="Name"
                                                    error={errors.contact_name?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            name={"contact_email"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            render={({field}) => (
                                                <TextInput
                                                    {...field}
                                                    type={"text"}
                                                    size={"lg"}
                                                    placeholder="Email"
                                                    error={errors.contact_email?.message}
                                                />
                                            )}
                                        />

                                        <div className={"text-primary"}>
                                            {errors.contact_email?.message}
                                        </div>
                                    </div>
                                    <div>
                                        <Controller
                                            name={"contact_message"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            render={({field}) => (
                                                <Textarea
                                                    {...field}
                                                    size={"lg"}
                                                    maxRows={6}
                                                    minRows={4}
                                                    placeholder="Message"
                                                    error={errors.contact_message?.message}
                                                />
                                            )}
                                        />

                                        <div className={"text-primary"}>
                                            {errors.contact_email?.message}
                                        </div>
                                    </div>

                                    {/*<div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"*/}
                                    {/*     data-callback={handleRecaptchaChange}></div>*/}

                                    <article className="grid place-content-center justify-start">
                                        <Button className="bg-red-600 text-white rounded-lg shadow-md " type={'submit'}
                                                disabled={loading}>
                                            Submit
                                        </Button>
                                    </article>
                                </section>
                            </form>
                        </div>
                    </article>
                </section>
            </div>
            <section className="mt-8">
                <iframe
                    src="https://maps.google.com/maps?q=Explore Institute of Hotel Management&output=embed"
                    className="w-full"
                    height={420}
                    frameBorder={0}
                    loading="lazy"
                />
            </section>
        </main>
    );
};
Contact.Layout = MainLayout;
export default Contact;
