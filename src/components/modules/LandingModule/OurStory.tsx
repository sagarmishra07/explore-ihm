import Welcome2 from "../../../assets/images/welcome2.svg";
import Image from "next/image";
import { Button } from "@mantine/core";

const OurStory = ({ content }: any) => {
  return (
    <main className="dynamic-x-padding grid md:grid-cols-2 mt-16 gap-x-6">
      <section className="">
        <article className="text-primary uppercase gap-3 font-bold text-lg">
          Welcome to
        </article>
        <article className="py-3">
          <div
            className="md:w-[16rem] font-extrabold text-3xl md:text-4xl  uppercase"
            data-aos="fade-up"
          >
            Our Story
          </div>
          <div
            data-aos="fade-right"
            className="py-3 text-md font-normal"
            dangerouslySetInnerHTML={{ __html: content?.description }}
          ></div>
        </article>
      </section>
      <section className="gap-2 rounded-lg h-96 ">
        <Image
          // data-aos="zoom-out"
          src={Welcome2}
          alt=""
          className="rounded-lg w-full object-cover "
        />
      </section>
    </main>
  );
};

export default OurStory;
