import landingImg from "../../../assets/images/landingImg.png";
import Image from "next/image";
import { Button, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import Welcome1 from "../../../assets/images/welcome1.svg";
import Welcome2 from "../../../assets/images/welcome2.svg";
import Welcome3 from "../../../assets/images/welcome3.svg";
import Welcome4 from "../../../assets/images/culinary-arts-etva.jpg";

const WelcomeSection = (props: any) => {
  const router = useRouter();
  const { content } = props;
  return (
    <main className="dynamic-x-padding grid md:grid-cols-2 mt-16 gap-6 ">
      <section className="">
        <article
          data-aos="fade-right"
          className="text-primary uppercase gap-3 font-bold text-lg"
        >
          Welcome to
        </article>
        <article className="py-3 grid gap-y-2">
          <div
            data-aos="fade-right"
            className=" w-[18rem] md:w-[28rem] font-extrabold text-2xl md:text-4xl uppercase text-left"
          >
            Explore Institute of Hotel Management
          </div>
          <Divider size={"xl"} color="red" style={{ width: "70px" }} />
          <div
            data-aos="fade-up"
            className="py-3 text-md md:text-lg font-normal"
            dangerouslySetInnerHTML={{ __html: content?.description }}
          ></div>
        </article>
        <article className="mt-5">
          <Button
            data-aos="flip-left"
            className="bg-red-600 rounded-lg shadow-xl"
            size="lg"
            uppercase
            onClick={() => router.push("/about-us/company")}
          >
            Read More
          </Button>
        </article>
      </section>
      <section className="space-y-4 ">
        <article className=" grid grid-cols-12 gap-4 ">
          <div className="col-span-7 w-full h-56">
            <img
              src={Welcome1.src}
              alt=""
              className="rounded-lg object-cover "
            />
          </div>
          <div className="col-span-5 w-full h-56">
            <img
              src={Welcome2.src}
              alt=""
              className="rounded-lg  object-cover "
            />
          </div>
        </article>
        <article className="grid grid-cols-12 gap-4 ">
          <div className="col-span-5 w-full h-56">
            <img
              src={Welcome3.src}
              alt=""
              className="rounded-lg object-cover "
            />
          </div>
          <div className="col-span-7 w-full h-56">
            <img
              src={Welcome4.src}
              alt=""
              className="rounded-lg object-cover "
            />
          </div>
        </article>
      </section>
    </main>
  );
};

export default WelcomeSection;
