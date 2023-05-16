import landingImg from "../../../assets/images/landingImg.png";
import { useState } from "react";
import { IconCheck } from "@tabler/icons";
import { IconUser } from "@tabler/icons";
import { Divider } from "@mantine/core";

const WhyExplore = (props: any) => {
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
      <section className=" ">
        <article className="text-primary uppercase gap-3 font-bold text-lg ">
          Explore IHM
        </article>
        <article className="py-3">
          <div className="w-[22rem] w-[16rem] font-semibold md:text-4xl text-2xl">
            Why Explore IHM ?
          </div>
          <Divider className="w-[5rem]" color={"red"} size={"xl"} />
        </article>
        <article>
          <div className="flex items-center">
            <div
              className="pl-8"
              dangerouslySetInnerHTML={{ __html: content?.description }}
            ></div>
          </div>
        </article>
      </section>
    </main>
  );
};
export default WhyExplore;
