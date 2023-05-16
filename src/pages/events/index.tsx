import React, {useEffect, useState} from "react";
import {Divider, Group} from "@mantine/core";
import {IconArrowNarrowRight, IconCalendarEvent, IconMapPin,} from "@tabler/icons";
import router from "next/router";
import MainLayout from "@/layouts/MainLayout";
import {firebaseGet} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import CommonHead from "@/components/common/CommonHead";
import Loading from "@/components/common/Loading";

const Events = () => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const getAllNews = async () => {
        setLoading(true);
        const res: any = await firebaseGet("Events");
        const formatted: any = FirebaseDTO.receive(res);
        setData(formatted);
        setLoading(false);
    };
    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllNews().then((r) => r);
        }
        return () => {
            unsubscribe = [];

        };
    }, [router.isReady]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding md:my-16 my-4">
                    <CommonHead title={`ExploreIHM | Events `}/>
                    <section className="">
                        <Group>
                            <section>
                                <article className="text-primary uppercase gap-3 text-lg font-bold">
                                    Explore IHM
                                </article>
                                <article className="md:py-3 py-2">
                                    <div className="w-[16rem] font-extrabold text-4xl uppercase">
                                        Our Events
                                    </div>
                                </article>
                            </section>

                            <Divider orientation="vertical" size={"xl"} color="red"/>
                            <article className="w-[18rem]">
                <span>
                  Our events provide an opportunity for students to showcase
                  their skills and learn from industry experts.
                </span>
                            </article>
                        </Group>
                    </section>

                    {/* contents for event page */}

                    <section className="pt-5 w-full">
                        {data.map((value: any, idx: any) => {
                            return (
                                <div className="space-y-5" key={idx}>
                                    <Divider orientation="horizontal" size={"sm"} color="gray"/>
                                    <div
                                        className="flex flex-col-reverse md:grid grid-cols-12 cursor-pointer gap-8"
                                        onClick={() => router.push(`/events/${value?.slug}`)}
                                    >
                                        <div className="py-2 text-slate-500 md:flex col-span-2  hidden">
                                            <div className="">
                                                <IconCalendarEvent className="mr-0"/>
                                            </div>
                                            <div>
                                                <div className="text-md font-semibold mr-8">
                                                    {value?.start_date} -
                                                </div>
                                                <div className="text-md font-semibold">
                                                    {value?.end_date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-7 py-2 space-y-3">
                                            <div className="font-bold text-2xl">
                                                {value?.event_title}
                                            </div>
                                            <div className=" text-slate-500 flex align-middle">
                                                <IconMapPin className="mr-2 text-md"/>{" "}
                                                {value?.location}
                                            </div>
                                            <div
                                                className="line-clamp-6 text-md"
                                                dangerouslySetInnerHTML={{__html: value?.description}}
                                            ></div>
                                            <div
                                                className="w-28 text-primary flex justify-between hover:cursor-pointer"
                                                onClick={() => router.push(`/events/${value?.slug}`)}
                                            >
                                                <div className="font-bold">Read more</div>
                                                <IconArrowNarrowRight/>
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <img
                                                className="md:p-5 rounded-lg w-full object-cover h-80"
                                                alt={value?.event_title}
                                                src={value?.imageUrl}
                                            />
                                        </div>
                                        <div className="py-2 text-slate-500 flex items-center col-span-2  md:hidden">
                                            <div className="pr-2">
                                                <IconCalendarEvent className="mr-0"/>
                                            </div>
                                            <div>
                                                <div className="text-md font-semibold mr-8">
                                                    {value?.start_date} - {value?.end_date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
Events.Layout = MainLayout;
export default Events;
