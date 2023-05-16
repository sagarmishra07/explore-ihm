import {Carousel} from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, {useEffect, useRef, useState} from "react";
import {Divider, Group, Paper} from "@mantine/core";
import {useRouter} from "next/router";
import {firebaseGetDataByQuery} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {IconArrowRight} from "@tabler/icons";

function Card({imageUrl, course_name, description, slug}: any) {
    const router = useRouter();

    return (
        <Paper
            shadow="xl"
            radius="xl"
            className="grid gap-y-4 rounded-lg cursor-pointer"
            onClick={() => router.push(`/courses/extra/${slug}`)}
            style={{height: "540px"}}
        >
            <div style={{position: "relative", width: "100%", height: "250px"}}>

                <img loading={"lazy"}
                    // data-aos="zoom-in"
                     src={imageUrl}
                     alt={course_name}
                     className="rounded-xl rotate-12 object-cover"
                />
            </div>

            <section className="px-5 py-5">
                <Divider size={"xl"} color="red"/>
                <article className="pt-5 grid gap-3">
                    <div
                        // data-aos="fade-right"
                        className="flex font-black text-2xl md:text-2xl capitalize text-left"
                    >
                        {course_name}
                    </div>
                    <div
                        // data-aos="fade-right"
                        className="flex line-clamp-2 text-sm md:text-md font-normal text-left"
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></div>
                    <Divider size={"sm"} color="gray"/>
                    <div
                        // data-aos="flip-right"
                        className="flex text-primary uppercase hover:cursor-pointer items-center space-x-2 "
                        onClick={() => router.push(`/courses/extra/${slug}`)}
                    >
                        <span className="font-semibold">READ MORE</span>
                        <span>
              <IconArrowRight size={35}/>
            </span>
                    </div>
                </article>
            </section>
        </Paper>
    );
}

const PopularCourses = () => {
    const router = useRouter()
    const autoplay = useRef(Autoplay({delay: 2000}));
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const getAllLandingData = async () => {
        setLoading(true);
        const res: any = await firebaseGetDataByQuery(
            "/ExtraCourses",
            "listed_in",
            "POPULAR"
        );
        const formatted: any = FirebaseDTO.receive(res);
        setData(formatted);
        setLoading(false);
    };

    useEffect(() => {
        let unsubscribe: any;
        if (router.isReady) {
            unsubscribe = getAllLandingData().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);

    const slides = data?.map((item: any, idx: any) => (
        <Carousel.Slide key={idx} className="my-10 ">
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <main>
            <section className="dynamic-x-padding mt-16">
                <Group>
                    <section>
                        <article
                            data-aos="fade-right"
                            className="text-primary uppercase gap-3 font-bold text-lg"
                        >
                            Explore IHM
                        </article>
                        <article className="py-3">
                            <div
                                data-aos="fade-right"
                                className="md:w-[18rem] text-3xl md:text-4xl uppercase font-black w-[18rem] text-left"
                            >
                                Our Popular Courses
                            </div>
                            <Divider
                                size={"xl"}
                                color="red"
                                className="sm:invisible w-[16rem]"
                            />
                        </article>
                    </section>

                    <Divider
                        orientation="vertical"
                        size={"xl"}
                        color="red"
                        className="md:visible invisible"
                    />
                    <article className="md:w-[18rem]">
            <span>
              Our course is packed with features that will help you learn and
              grow, no matter where you are in your career journey.
            </span>
                    </article>
                </Group>
            </section>
            <section className="dynamic-x-padding">
                <Carousel
                    slideSize="33%"
                    breakpoints={[
                        {maxWidth: "sm", slideSize: "100%"},
                        {maxWidth: "md", slideSize: "50%"},
                        {maxWidth: "lg", slideSize: "50%"},
                    ]}
                    slideGap="xl"
                    align="start"
                    // height={500}
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    withControls={true}
                    withIndicators={true}
                    loop
                    className={"dynamic-x-padding"}
                >
                    {slides}
                </Carousel>
            </section>
        </main>
    );
};

export default PopularCourses;
