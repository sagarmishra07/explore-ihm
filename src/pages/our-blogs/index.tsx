import React, {useEffect, useState} from "react";
import {Divider, Group, Paper} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import router, {useRouter} from "next/router";
import CommonHead from "@/components/common/CommonHead";
import {firebaseGet} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {IconArrowRight} from "@tabler/icons";
import Loading from "@/components/common/Loading";

function Card({imageUrl, blog_title, blog_description, slug}: any) {
    return (
        <Paper radius="xl" className="grid gap-y-4 rounded-lg cursor-pointer "
               onClick={() => router.push(`/our-blogs/${slug}`)}>
            <div style={{position: "relative", width: "100%", height: "250px"}}>


                <img loading={"lazy"}
                    // data-aos="zoom-in"
                     src={imageUrl}
                     alt={blog_title}
                     className="rounded-xl rotate-12 object-cover"
                />
            </div>
            <section className="">
                <Divider size={"xl"} color="red"/>
                <article className="pt-5 grid gap-3">
                    <div className="flex font-extrabold text-2xl capitalize text-left">
                        {blog_title}
                    </div>
                    {/*<div*/}
                    {/*  data-aos="fade-up"*/}
                    {/*  className="flex line-clamp-2 text-md font-normal"*/}
                    {/*  dangerouslySetInnerHTML={{ __html: blog_description }}*/}
                    {/*></div>*/}
                    <Divider size={"sm"} color="gray"/>
                    <div
                        className="flex text-primary uppercase hover:cursor-pointer items-center space-x-2"
                        onClick={() => router.push(`/our-blogs/${slug}`)}
                    >
                        <span>READ MORE</span>
                        <span>
              <IconArrowRight size={35}/>
            </span>
                    </div>
                </article>
            </section>
        </Paper>
    );
}

const OurBlogs = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const [data, setData] = useState([]);

    const getAllBlogs = async () => {
        setLoading(true);
        const res: any = await firebaseGet("landing/Blogs");
        const formatted: any = FirebaseDTO.receive(res)?.reverse();
        setData(formatted);
        setLoading(false);
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllBlogs().then((r) => r);
        }
        return () => {
            unsubscribe = []


        };
    }, [router.isReady]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding  my-16">
                    <CommonHead title={"ExploreIHM | Blogs"}/>

                    <section className="">
                        <Group>
                            <section>
                                <article className="text-primary uppercase gap-3 font-bold text-lg">
                                    Explore IHM
                                </article>
                                <article className="py-3">
                                    <div className="w-[14rem] font-extrabold text-4xl uppercase">
                                        Our Blogs
                                    </div>
                                </article>
                            </section>
                            <Divider orientation="vertical" size={"xl"} color="red"/>
                            <article className="w-[18rem]">
                <span>
                By reading our blog, you can learn about industry trends, new
                products, or services, and other relevant topics.
                </span>
                            </article>
                        </Group>
                    </section>
                    <section>
                        <article className="md:grid grid-cols-12 gap-6 space-y-10 md:space-y-0 mt-16 ">
                            {data?.map((val: any, idx: number) => (
                                <div className="col-span-4" key={idx}>
                                    <Card key={idx} {...val} />
                                </div>
                            ))}
                        </article>
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
OurBlogs.Layout = MainLayout;
export default OurBlogs;
