import React, {useEffect, useState} from "react";
import {Avatar, Divider, Group} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import {firebaseGet} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import CommonHead from "@/components/common/CommonHead";
import Loading from "@/components/common/Loading";
import {useRouter} from "next/router";

const Testomonial = () => {
    const [serviceItem, setServiceItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const getAllTestimonials = async () => {
        const res: any = await firebaseGet("landing/Testimonial");
        const formatted: any = FirebaseDTO.receive(res);
        setServiceItem(formatted);
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            setLoading(true);

            unsubscribe = getAllTestimonials().then((r) => r);
            setLoading(false);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);

    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding my-16">
                    <CommonHead title={"Explore IMH | Testimonials"}/>

                    <section className="">
                        <Group>
                            <section>
                                <article className="text-primary uppercase gap-3 font-bold text-lg">
                                    Explore IHM
                                </article>
                                <article className="py-3">
                                    <div className="w-[16rem] font-extrabold text-4xl uppercase">
                                        Students Testimonials
                                    </div>
                                </article>
                            </section>

                            <Divider orientation="vertical" size={"xl"} color="red"/>
                            <article className="w-[18rem]">
                <span>
                These testimonials are a testament to the quality of education and 
                facilities provided by our institute.
                </span>
                            </article>
                        </Group>
                    </section>

                    <section className="md:grid grid-cols-12 gap-4 mt-16">
                        {serviceItem?.map((val: any, idx: any) => (
                            <article className="col-span-6 " key={idx}>
                                <div className="md:grid grid-cols-12">
                                    <div className="col-span-4">
                                        <Avatar
                                            src={val.imageUrl}
                                            className="rounded-full border-solid border-4 border-white h-44 w-44 "
                                        />
                                    </div>
                                    <div className="col-span-8 p-5">
                                        <div className="font-extrabold text-2xl uppercase  text-left">
                                            {val?.student_name}
                                        </div>
                                        <Divider size={"lg"}/>
                                        <div
                                            className="py-2 text-left"
                                            dangerouslySetInnerHTML={{__html: val?.description}}
                                        ></div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
Testomonial.Layout = MainLayout;
export default Testomonial;
