import {Carousel} from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, {useEffect, useRef} from "react";
import {Divider, Group, Paper} from "@mantine/core";
import router, {useRouter} from "next/router";
import {IconArrowRight} from "@tabler/icons";

function Card({slug, imageUrl, feature_name, description}: any) {
    return (
        <Paper
            radius="xl"
            className="grid gap-y-4 rounded-lg cursor-pointer"
            onClick={() => router.push(`/features/${slug}`)}
            style={{height: "540px"}}
        >
            <div
                className="text-left"
                style={{position: "relative", width: "100%", height: "250px"}}
            >
                <img
                    loading={"lazy"}
                    src={imageUrl}
                    alt={feature_name}
                    className="rounded-t-xl rotate-12 object-cover"
                />
            </div>

            <section className="px-5 py-5">
                <Divider size={"xl"} color="red"/>
                <article className="pt-5 grid gap-3">
                    <div
                        data-aos="fade-right"
                        className="flex font-extrabold text-2xl md:text-2xl capitalize"
                    >
                        {feature_name}
                    </div>
                    <div
                        data-aos="fade-right"
                        className=" line-clamp-2 text-sm md:text-md font-normal"
                        dangerouslySetInnerHTML={{__html: description}}
                    ></div>
                    <div
                        data-aos="flip-right"
                        className="flex text-primary uppercase hover:cursor-pointer space-x-2 items-center"
                        onClick={() => router.push(`/features/${slug}`)}
                    >
                        <span className="font-semibold">READ MORE</span>
                        <span>
              <IconArrowRight size={35}/>
            </span>
                    </div>
                    <Divider size={"sm"} color="red"/>
                </article>
            </section>
        </Paper>
    );
}

const OurFeatures = (props: any) => {
    const {content} = props;
    const router = useRouter();
    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            if (content?.length < 9) {
                const remainingItems = 9 - content.length;
                for (let i = 0; i < remainingItems; i++) {
                    content.push(content[i]);
                }
            }
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady])
    const autoplay = useRef(Autoplay({delay: 2000}));

    const slides = content?.map((item: any) => (
        <Carousel.Slide key={item?.key} className="my-10 ">
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
                            className="text-primary uppercase gap-3 font-bold text-lg "
                        >
                            Explore IHM
                        </article>
                        <article className="py-3">
                            <div
                                data-aos="fade-right"
                                className="md:w-[18rem] font-extrabold text-3xl md:text-4xl uppercase"
                            >
                                Our Features
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
                    loop={true}
                    className={"dynamic-x-padding"}
                >
                    {slides}
                </Carousel>
            </section>
        </main>
    );
};

export default OurFeatures;
