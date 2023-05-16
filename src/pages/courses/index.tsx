import {useEffect, useState} from "react";

import {Divider, Group} from "@mantine/core";
import {useRouter} from "next/router";
import {firebaseGet} from "@/api/firebase";
import showNotify from "@/utils/notify";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import Loading from "@/components/common/Loading";
import MainLayout from "@/layouts/MainLayout";
import {IconArrowRight} from "@tabler/icons";

const fireabaseUrl = "/Courses";
const Courses = () => {
    const router = useRouter();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const getAllCourses = async () => {
        try {
            setLoading(true);
            const res: any = await firebaseGet(fireabaseUrl);
            const formatted: any = FirebaseDTO.receive(res);
            setRows(formatted);
            setLoading(false);
        } catch (e: any) {
            showNotify("error", e?.message);
        }
    };

    useEffect(() => {
        let unsubscribe: any;
        if (router.isReady) {

            unsubscribe = getAllCourses().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);

    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding my-16 ">
                    <section className="">
                        <Group>
                            <section>
                                <article className="text-primary uppercase gap-3  font-bold text-lg">
                                    Explore IHM
                                </article>
                                <article className="py-3">
                                    <div className="font-extrabold text-4xl uppercase">
                                        Courses
                                    </div>
                                </article>
                            </section>

                            <Divider orientation="vertical" size={"xl"} color="red"/>
                            <article className="w-[18rem]">
                <span>
                 Our course is packed with features that will help you learn and grow, 
                 no matter where you are in your career journey.
                </span>
                            </article>
                        </Group>
                    </section>
                    {rows?.map((val: any, idx: number) => (
                        <>
                            <article
                                key={idx}
                                className={
                                    "md:grid grid-cols-12 gap-4 pt-8 hover:cursor-pointer"
                                }
                                onClick={() => router.push(`/courses/${val?.slug}`)}
                            >
                                <div className="col-span-5">
                                    <img
                                        src={val?.imageUrl}
                                        alt=""
                                        className="rounded-lg h-80 w-full object-contain"
                                    />
                                </div>
                                <div className="col-span-7 ">
                                    <div className="pb-5">
                                        <div className="uppercase text-primary font-extrabold text-3xl">
                                            {val?.course_name}
                                        </div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: val?.description,
                                            }}
                                            className={"font-normal text-md"}
                                        ></div>
                                        <div
                                            className="text-primary uppercase pt-4 flex items-center space-x-2"
                                            onClick={() => router.push(`/courses/${val?.slug}`)}
                                        >
                                            <span className="font-extrabold">READ MORE</span>
                                            <span>
                        <IconArrowRight size={35}/>
                      </span>
                                        </div>
                                    </div>
                                    <Divider size={"xl"} color="red"/>
                                </div>
                            </article>
                            
                        </>
                    ))}
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
Courses.Layout = MainLayout;
export default Courses;
