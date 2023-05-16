import React, {useEffect, useState} from "react";
import MainLayout from "@/layouts/MainLayout";
import {firebaseGetDataByQuery} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {useRouter} from "next/router";
import CommonHead from "@/components/common/CommonHead";
import Loading from "@/components/common/Loading";

const EventDetails = () => {
    const router = useRouter();
    const [data, setData] = useState<any>([]);
    const {id} = router.query;
    const [loading, setLoading] = useState(false);

    const getSingleBlog = async () => {
        if (id) {
            setLoading(true);
            const res: any = await firebaseGetDataByQuery(`Events`, "slug", id[0]);
            const formatted: any = FirebaseDTO.receive(res);
            setData(formatted);
            setLoading(false);
        }
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getSingleBlog().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding my-16">
                    <CommonHead title={`Events | ${data[0]?.keyword || ""} `}/>

                    <section className=" flex flex-col-reverse md:grid grid-cols-12 gap-4">
                        <section className=" col-span-8">
                            <article className="text-primary uppercase gap-3 text-lg font-bold">
                                Explore IHM
                            </article>
                            <article className="py-3">
                                <div className="w-[48rem] font-semibold text-3xl uppercase">
                                    {data[0]?.event_title}
                                </div>
                            </article>
                            <article
                                dangerouslySetInnerHTML={{__html: data[0]?.description}}
                            ></article>
                        </section>
                        <section className=" col-span-4">
                            <div className="grid grid-cols-4 gap-4 p-4">
                                <div className="shadow-lg rounded-lg col-span-4">
                                    <img
                                        src={data[0]?.imageUrl}
                                        alt=""
                                        className="rounded-md h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </section>
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
EventDetails.Layout = MainLayout;
export default EventDetails;
