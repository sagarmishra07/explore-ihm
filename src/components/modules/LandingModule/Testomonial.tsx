import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Button, Divider, Group, Avatar } from "@mantine/core";
import { useRouter } from "next/router";

const Testomonial = (props: any) => {
  const router = useRouter();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <main className="dynamic-x-padding my-16">
      <section className="">
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
                className="md:w-[14rem] font-extrabold text-3xl md:text-4xl uppercase"

              >
                Students testimonials
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
             These testimonials are a testament to the quality of education and 
             facilities provided by our institute.
            </span>
          </article>
        </Group>
      </section>
      <section className="grid grid-cols-12 gap-4 mt-16">
        {props?.content?.slice(0, 2).map((val: any, idx: any) => (
          <div className="md:col-span-6 col-span-12" key={idx}>
            <div className="grid grid-cols-12">
              <div className="md:col-span-4 col-span-12 flex justify-center">
                <Avatar
                  data-aos="zoom-in"
                  src={val?.imageUrl || "cover-image"}
                  className="rounded-full border-solid border-4 border-white h-44 w-44 "
                />
              </div>
              <div className="md:col-span-8 col-span-12 p-5">
                <div data-aos="fade-right" className="pb-2 text-2xl font-extrabold">
                  {val?.student_name}
                </div>
                <Divider size={"xl"} />
                <div
                  data-aos="fade-right"
                  className="pt-2 text-md font-normal"
                  dangerouslySetInnerHTML={{ __html: val?.description }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-center mt-10" data-aos="flip-right">
        <Button
          variant="outline"
          color="red"
          className="rounded-xl px-5  hover:bg-primary hover:text-white"
          uppercase
          onClick={() => router.push("/testimonials")}
        >
          View More
        </Button>
      </div>
    </main>
  );
};

export default Testomonial;
