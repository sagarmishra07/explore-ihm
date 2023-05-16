import React, {useEffect, useState} from "react";
import {Card, Divider, Group} from "@mantine/core";
import router from "next/router";
import MainLayout from "@/layouts/MainLayout";
import {firebaseGet} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import Loading from "@/components/common/Loading";

const Album = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllGallery = async () => {
        const res: any = await firebaseGet("landing/Album");
        setLoading(true);

        const formatted: any = FirebaseDTO.receive(res);

        const rows = formatted?.map((v: any) => ({
            album_title: v?.album_title || "",
            key: v?.key || "",
            gallery: FirebaseDTO.receive(v?.gallery),
        }));

        setGallery(rows);
        setLoading(false);
    };
    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllGallery().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);
    const items = [
        {title: 'Gallery', href: '/gallery'},

    ].map((item, index) => (
        <span
            className={`${item?.href === router.pathname ? 'text-primary' : 'text-secondary'} text-lg  cursor-pointer uppercase`}
            key={index} onClick={() => router.push(item.href)}>
        {item.title}

      </span>

    ));

    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding my-16">
                    {/* <CommonHead title={"Explore IHM | Teams"} /> */}
                    {/* <section className={'dynamic-y-padding'}>
            <Breadcrumbs separator="/" className={'space-x-3'}>{items}</Breadcrumbs>
          </section> */}

                    <section className="">
                        <Group>
                            <section>
                                <article className="text-primary uppercase gap-3 font-bold text-lg">
                                    Explore IHM
                                </article>
                                <article className="py-3">
                                    <div className="w-[14rem] font-extrabold text-4xl uppercase">
                                        Our Gallery
                                    </div>
                                </article>
                            </section>

                            <Divider orientation="vertical" size={"xl"} color="red"/>
                            <article className="w-[18rem]">
                <span>
                Our gallery is a showcase of the talent and creativity of our community, 
                and we are proud to share it with you.
                </span>
                            </article>
                        </Group>
                    </section>
                    <section className="grid md:grid-cols-4 gap-4 mt-16">
                        {gallery?.map((val: any, idx: number) => (
                            <Card
                                p="lg"
                                radius="md"
                                key={idx}
                                className="hover:cursor-pointer space-y-4"
                                onClick={() => router.push(`/gallery/${val?.key}`)}
                            >
                                <Card.Section style={{position: "relative", height: "220px"}}>

                                    <img loading={"lazy"}
                                        // data-aos="zoom-in"
                                         src={val?.gallery[0]?.imageUrl}
                                         alt={val?.album_title}
                                         className="rounded-xl rotate-12 object-cover"
                                    />
                                </Card.Section>
                                <Card.Section className="flex justify-center  font-bold text-2xl capitalize">
                                    <div>{val?.album_title}</div>
                                </Card.Section>
                                <Card.Section className="flex justify-center text-primary text-md font-semibold">
                                    <div>{val?.gallery?.length} photos</div>
                                </Card.Section>
                            </Card>
                        ))}
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
Album.Layout = MainLayout;
export default Album;
