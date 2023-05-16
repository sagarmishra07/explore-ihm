import {Breadcrumbs, Button, Divider} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {firebaseGetDataByQuery} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import Loading from "@/components/common/Loading";

const CourseDetails = () => {
    const router = useRouter();
    const id: any = router?.query?.id;
    const [loading, setLoading] = useState<any>(false);

    const [course, setCourse] = useState<any>({});
    const getAllCoursesData = async () => {
        if (id) {
            setLoading(true);
            const res: any = await firebaseGetDataByQuery(
                "/ExtraCourses",
                "slug",
                id[0]
            );
            const formatted: any = FirebaseDTO.receive(res);
            setCourse(formatted[0]);
            setLoading(false);
        }
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllCoursesData().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);

    const items = [
        {title: 'Courses', href: '/courses'},
        {title: `${course?.category}`, href: `/courses/${course?.category}`},

        {title: `${course?.course_name}`, href: `/courses/extra/${course?.slug}`},


    ].map((item, index) => (
        <>
            {id && (
                <span
                    className={`${item?.href === router.pathname ? 'text-primary' : 'text-dark'} text-md uppercase  cursor-pointer `}
                    key={index} onClick={() => router.push(item.href)}>
        {item.title}

      </span>
            )}
        </>

    ));
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding dynamic-y-padding">
                    <div
                        className="absolute right-0 bg-gray-200 bg-opacity-60 invisible md:visible"
                        style={{
                            height: "50%",
                            width: "30%",
                            zIndex: "-999",
                        }}
                    >
                        <Divider
                            size={"xl"}
                            className="w-60 absolute bottom-0  right-0"
                            color={"#C00000"}
                        />
                    </div>
                    <section className={''}>
                        <Breadcrumbs separator="/" className={'space-x-3'}>{items}</Breadcrumbs>
                    </section>
                    <section className="py-10 z-10">
                        <div className="lg:mb-36">
                            <p className="font-normal text-lg text-primary uppercase">
                                EXPLORE IHM
                            </p>
                            <div className="md:grid grid-cols-2 gap-8">
                                <div>
                                    <div className="py-5">
                    <span className="flex  font-bold text-2xl capitalize">
                      {course?.course_name}
                    </span>
                                    </div>

                                    <div className="">
                                        <Divider size={"xl"} className="w-24" color={"#C00000"}/>
                                    </div>
                                    <div
                                        className={"dynamic-y-padding  text-md font-normal"}
                                        dangerouslySetInnerHTML={{__html: course?.description}}
                                    ></div>
                                    {course?.pdfUrl && (
                                        <>
                                            <div>
                                                <img
                                                    src={course?.pdfUrl}
                                                    alt="PD"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            {/* <Button
                                                className={"bg-primary text-white"}

                                                onClick={() => window.open(course?.pdfUrl, '_blank')}
                                            >
                                                Download Full Course

                                            </Button> */}
                                        </>

                                    )}
                                </div>
                                <div className="h-96">
                                    <img
                                        className="rounded-lg h-80 w-full object-cover"
                                        src={course?.imageUrl}
                                        alt="title"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* second section */}
                    </section>
                    <section>
                        <article className="grid grid-cols-12 gap-6 mt-16">
                            {/*{course?.map((val: any, idx: number) => (*/}
                            {/*  <div className="col-span-4 " key={idx}>*/}
                            {/*    <Card key={idx} {...val} />*/}
                            {/*  </div>*/}
                            {/*))}*/}
                        </article>
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
CourseDetails.Layout = MainLayout;
export default CourseDetails;
