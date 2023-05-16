import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

const HeroSection = (props: any) => {
  const { content } = props;
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const router = useRouter();
  return (
    <main className="w-full">
      <Carousel
        mx="auto"
        height={550}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        withControls={false}
        withIndicators={true}
      >
        {content?.map((val: any, idx: number) => (
          <Carousel.Slide key={idx}>
            <Image
              src={val?.imageUrl}
              alt={val?.title}
              className={"opacity-80 object-cover"}
            />
            <article className="absolute h-full w-full grid place-content-center gap-5 ">
              <div
                className="text-5xl font-extrabold text-primary text-center h-full "
                data-aos="fade-right"
              >
                {val.title}
              </div>
              <div
                className="sm:text-4xl md:text-6xl text-white text-center uppercase font-extrabold"
                data-aos="fade-left"
              >
                {val.subtitle}
              </div>
              <div className="text-center space-x-2 ">
                <Button
                  // data-aos="fade-up"
                  data-aos-duration="3000"
                  className="bg-red-600 rounded-lg shadow-xl  hover:bg-white hover:text-primary"
                  size="lg"
                  uppercase
                  onClick={() => router.push("/about-us/company")}
                >
                  Read More
                </Button>
                <Button
                  // data-aos="fade-up"
                  data-aos-duration="1000"
                  className="bg-white text-black rounded-lg  hover:bg-primary hover:text-white"
                  size="lg"
                  uppercase
                  onClick={() => router.push("/our-facilities")}
                >
                  Our Facilities
                </Button>
              </div>
            </article>
          </Carousel.Slide>
        ))}
      </Carousel>
    </main>
  );
};

export default HeroSection;
