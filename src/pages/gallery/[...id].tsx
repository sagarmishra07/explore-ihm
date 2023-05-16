import React, {useEffect, useState} from "react";
import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
import {firebaseGetOne} from "@/api/firebase";
import CommonHead from "@/components/common/CommonHead";
import Loading from "@/components/common/Loading";
import {Breadcrumbs, Modal} from "@mantine/core";

const Gallery = () => {
    const router = useRouter();

    const {id} = router.query;
    const [loading, setLoading] = useState<any>(false);
    const [selected, setSelected] = useState<any>({});
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const getAllPhotos = async () => {
        if (id) {
            setLoading(true);
            const res: any = await firebaseGetOne(`landing/Album`, id[0]);

            setData(res);
            setLoading(false);
        }
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllPhotos().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);

    const items = [
        {title: 'Gallery', href: '/gallery'},
        {title: `${data?.album_title}`, href: `#`}

    ].map((item, index) => (
        <span
            className={`${item?.href === router.pathname ? 'text-primary' : 'text-dark'} text-md uppercase  cursor-pointer `}
            key={index} onClick={() => router.push(item.href)}>
        {item.title}

      </span>

    ));
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding dynamic-y-padding grid gap-4 ">
                    <CommonHead title={`Album | ${data?.album_title || ""}`}/>
                    <section className={''}>
                        <Breadcrumbs separator="/" className={'space-x-3 font-extrabold'}>{items}</Breadcrumbs>
                    </section>

                    <section className={"capitalize font-bold text-3xl text-primary"}>
                        {data?.album_title}
                    </section>
                    <section className="grid grid-cols-12 gap-4">
                        {data?.album_title &&
                            Object.values(data?.gallery)?.map((val: any, idx: number) => (
                                <article className="md:col-span-4 col-span-12" key={idx}>
                                    <img
                                        src={val?.imageUrl}
                                        alt=""
                                        className="h-80 w-full object-cover"
                                        onClick={() => {
                                            setSelected(val)
                                            setOpen(true)
                                        }}
                                    />
                                </article>
                            ))}
                    </section>

                    <section>
                        <Modal
                            opened={open}
                            onClose={() => setOpen(false)}
                            centered
                            size={'auto'}
                            transition="rotate-left"
                            transitionDuration={600}
                            transitionTimingFunction="ease"
                        >
                            <img
                                src={selected?.imageUrl}
                                alt=""
                                className="h-500 w-full"

                            />
                        </Modal>

                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
Gallery.Layout = MainLayout;
export default Gallery;
