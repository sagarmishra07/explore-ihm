import React, {useEffect, useState} from "react";
import MainLayout from "@/layouts/MainLayout";
import CommonHead from "@/components/common/CommonHead";
import {firebaseGet, firebaseGetDataByQuery} from "@/api/firebase";
import {useRouter} from "next/router";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import Loading from "@/components/common/Loading";

const FeatureDetails = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [latestBlogs, setLatestBlogs] = useState([])
    const [data, setData] = useState<any>([
        {
            imageUrl: "",
            blog_title: "",
            blog_description: "",
        },
    ]);

    const {id} = router.query;

    const getSingleFeature = async () => {
        if (id) {
            setLoading(true);
            const res: any = await firebaseGetDataByQuery(
                `landing/Blogs`,
                "slug",
                id[0]
            );
            const formatted: any = FirebaseDTO.receive(res);
            setData(formatted);
            setLoading(false);
        }
    };
    const getAllBlogs = async () => {
        if (id) {

            const res: any = await firebaseGet('/landing/Blogs');
            const formatted: any = FirebaseDTO.receive(res);
            const recent = formatted?.reverse();
            const filtered: any = recent?.filter((val: any) => val?.slug != id as string)
            setLatestBlogs(filtered?.slice(0, 4))
        }
    }

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllBlogs().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [data]);


    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getSingleFeature().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding my-16">
                    <CommonHead title={`Blogs | ${data[0]?.keyword || ""} `}/>

                    <section className="md:grid grid-cols-12 gap-7">
                        <section className=" col-span-9">
                            <article className="text-primary uppercase gap-3 font-bold text-lg">
                                Explore IHM
                            </article>
                            <article className="py-3">
                                <div className=" w-[56rem] font-semibold text-2xl uppercase text-left">
                                    {data[0]?.blog_title}
                                </div>
                            </article>
                            <article
                                className="py-3 text-md font-normal text-left"
                                dangerouslySetInnerHTML={{__html: data[0]?.blog_description}}
                            ></article>
                        </section>
                        <section className="col-span-3 space-y-6">
                            <div className={'text-3xl font-extrabold'}>Recent Blogs</div>
                            <div className={'grid'}>
                                {latestBlogs.map((val: any, idx: any) => (
                                        <div key={idx} className={'px-4'}>
                            <span>
                            <p className={'text-xl hover:underline cursor-pointer text-primary text-left'}
                               onClick={() => router.push(`/our-blogs/${val?.slug}`)}> {val?.blog_title}</p><br/>

                            </span>
                                        </div>
                                    )
                                )}
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
