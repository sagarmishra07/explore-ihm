import {Carousel} from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import {useEffect, useRef, useState} from "react";
import {Divider, Group, Paper} from "@mantine/core";
import router, {useRouter} from "next/router";
import {IconArrowRight} from "@tabler/icons";

function Card({imageUrl, blog_title, blog_description, slug}: any) {
    return (
        <Paper
            radius="xl"
            className="grid gap-y-4 rounded-lg cursor-pointer"
            onClick={() => router.push(`/our-blogs/${slug}`)}
        >
            <div style={{position: "relative", width: "100%", height: "250px"}}>
                <img src={imageUrl} alt="" className="object-cover"/>
            </div>
            <section className="px-5 py-5">
                <Divider size={"xl"} color="red"/>
                <article className="pt-5 grid gap-3">
                    <div
                        data-aos="fade-right"
                        className="flex font-extrabold text-2xl md:text-2xl capitalize text-left"
                    >
                        {blog_title}
                    </div>
                    {/*<div*/}
                    {/*  data-aos="fade-up"*/}
                    {/*  className="flex  line-clamp-2 text-sm md:text-md font-normal"*/}
                    {/*  dangerouslySetInnerHTML={{ __html: blog_description }}*/}
                    {/*></div>*/}
                    <Divider size={"sm"} color="gray"/>
                    <div
                        data-aos="flip-right"
                        className="flex text-primary uppercase hover:cursor-pointer"
                        onClick={() => router.push(`/our-blogs/${slug}`)}
                    >
                        <div className={"flex items-center space-x-2"}>
                            <span className="font-semibold">READ MORE</span>
                            <span>
                <IconArrowRight size={35}/>
              </span>
                        </div>
                    </div>
                </article>
            </section>
        </Paper>
    );
}

const OurBlogs = (props: any) => {
    const {content} = props;
    const router = useRouter();
    const [slides, setSlides] = useState<any>([])
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
            unsubscribe = [];
        };
    }, [router.isReady]);
    const autoplay = useRef(Autoplay({delay: 2000}));

    useEffect(() => {
        if (content?.length > 3) {

            const slides = content?.map((item: any, idx: any) => (
                <Carousel.Slide key={idx} className="my-10 ">
                    <Card {...item} />
                </Carousel.Slide>
            ));
            setSlides(slides)
        }

    }, [content]);

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
                                className="md:w-[16rem] font-extrabold text-3xl md:text-4xl uppercase"
                            >
                                Our Blogs
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
              By reading our blog, you can learn about industry trends, new
              products, or services, and other relevant topics.
            </span>
                    </article>
                </Group>
            </section>

            {slides?.length > 0 && (
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
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                        withControls={true}
                        loop
                        className="dynamic-x-padding"
                    >
                        {slides}
                    </Carousel>
                </section>
            )}

        </main>
    );
};

export default OurBlogs;
