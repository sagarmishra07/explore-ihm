import React, {useEffect, useState} from "react";
import MainLayout from "@/layouts/MainLayout";
import CommonHead from "@/components/common/CommonHead";
import {firebaseGetDataByQuery} from "@/api/firebase";
import {useRouter} from "next/router";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import Loading from "@/components/common/Loading";

const FeatureDetails = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<any>([
        {
            imageUrl: "",
            feature_name: "",
            description: "",
        },
    ]);

    const {id} = router.query;
    const getSingleFeature = async () => {
        if (id) {
            setLoading(true);
            const res: any = await firebaseGetDataByQuery(
                `landing/Features`,
                "slug",
                id[0]
            );
            const formatted: any = FirebaseDTO.receive(res);
            setData(formatted);
            setLoading(false);
        }
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getSingleFeature().then((r) => r);
        }
        return () => {
            unsubscribe = []
        };
    }, [router.isReady]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding my-16">
                    <CommonHead title={`Features | ${data[0]?.keyword || ""} `}/>

                    <section className="md:grid grid-cols-12 gap-4">
                        <section className=" col-span-8">
                            <article className="text-primary uppercase gap-3 font-bold text-lg">
                                Explore IHM
                            </article>
                            <article className="py-3">
                                <div className=" w-[22rem] font-semibold text-2xl uppercase">
                                    {data[0]?.feature_name}
                                </div>
                            </article>
                            <article
                                className="py-3 text-md font-normal"
                                dangerouslySetInnerHTML={{__html: data[0]?.description}}
                            ></article>
                        </section>
                        <section className="col-span-4">
                            <div className="grid grid-cols-4 gap-4 p-4">
                                <div className="shadow-lg rounded-lg col-span-4">
                                    <img
                                        src={data[0]?.imageUrl}
                                        alt=""
                                        className="rounded-md  w-full object-cover h-full"
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
FeatureDetails.Layout = MainLayout;
export default FeatureDetails;
