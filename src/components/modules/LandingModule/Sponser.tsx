import {Carousel} from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import {useEffect, useRef} from "react";
import {useRouter} from "next/router";

const Sponser = (props: any) => {
    const {content} = props;
    const router = useRouter()
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
    const autoplay = useRef(Autoplay({delay: 4000}));

    const slides = props?.content?.map((item: any, idx: number) => (
        <Carousel.Slide key={idx} className="flex justify-center h-40">
            <img src={item.imageUrl} alt="Sponser" className="object-contain "/>
        </Carousel.Slide>
    ));

    return (
        <main>
            <section className="dynamic-x-padding my-16">
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
        </main>
    );
};

export default Sponser;
