import landingImg from "../../../assets/images/landingImg.png";
import { useState } from "react";
import Image from "next/image";
import { Button, Divider } from "@mantine/core";
const Message = (props: any) => {
  const { content } = props;
  const [serviceItem, setServiceItem] = useState([
    {
      url: landingImg,
      name: "Warehousing / Storage",
      description:
        "The company will provide elaborate post harvest facilities (cleaning, grading , sorting) of grains, which will be tested and standardized by applying laboratory tests. ",
    },
  ]);

  return (
    <main className="px-5 ">
      <section className="grid grid-cols-12 gap-4">
        <section className="md:col-span-8 col-span-12">
          <article className="text-primary uppercase gap-3 font-bold text-lg">
            Explore IHM
          </article>
          <article className="py-3">
            <div className="font-semibold md:text-4xl text-2xl uppercase">
              Message - Program <br /> Director
            </div>
            <Divider className="w-[5rem]" color={"red"} size={"xl"} />
          </article>
          <article
            dangerouslySetInnerHTML={{ __html: props?.content?.description }}
          ></article>
        </section>
        <section className=" md:col-span-4 col-span-12">
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="shadow-lg rounded-lg col-span-4">
              <img
                src={content?.imageUrl}
                alt="MD"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
export default Message;
