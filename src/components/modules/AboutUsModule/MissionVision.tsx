import landingImg from "../../../assets/images/landingImg.png";
import { Button, Paper, Divider, Group } from "@mantine/core";
import Mission from "../../../../images/Rectangle 29.png";
import Vision from "../../../../images/Rectangle 30.png";
import Statement from "../../../../images/Rectangle 31.png";

const MissionAndVision = (props: any) => {
  const { content } = props;

  return (
    <main className="px-5">
      <section className="">
        <Group>
          <section>
            <article className="text-primary uppercase gap-3 font-bold text-lg">
              Explore IHM
            </article>
            <article className="py-3">
              <div className="w-[22rem] w-[16rem] font-extrabold md:text-4xl text-2xl">
                Mission And Vision
              </div>
            </article>
          </section>
          <Divider orientation="vertical" size={"xl"} color="red" className={'hidden md:block'}/>
          <article className="w-[18rem]">
            <span>
            Our institute provides students with opportunities for lifelong learning and personal development.
            </span>
          </article>

        </Group>
      </section>
      <section className="space-y-5">
        <article className={"grid grid-cols-12 gap-4 pt-8  "}>
          <div className="md:col-span-4 col-span-12">
            <img src={Mission.src} alt="" className="rounded-lg h-52 w-full" />
          </div>
          <div className="md:col-span-8 col-span-12 flex justify-center items-center">
            <div>
              <div className="uppercase text-primary font-extrabold text-2xl">
                Mission
              </div>
              <div
                className="font-normal text-md"
                dangerouslySetInnerHTML={{ __html: content?.mission }}
              ></div>
            </div>
          </div>
        </article>
        <Divider />
        <article className={"grid grid-cols-12 gap-4 pt-8 "}>
          <div className="md:col-span-8 col-span-12 flex justify-center items-center">
            <div>
              <div className="uppercase text-primary font-extrabold text-2xl">
                Vision
              </div>
              <div
                className="text-md font-normal"
                dangerouslySetInnerHTML={{ __html: content?.vision }}
              ></div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12 ">
            <img src={Vision.src} alt="" className="rounded-lg h-52 w-full" />
          </div>
        </article>
        <Divider />
        <article className={"grid grid-cols-12 gap-4 pt-8  "}>
          <div className="md:col-span-4 col-span-12">
            <img
              src={Statement.src}
              alt=""
              className="rounded-lg h-52 w-full"
            />
          </div>
          <div className="md:col-span-8 col-span-12 flex justify-center items-center">
            <div>
              <div className="uppercase text-primary font-extrabold text-2xl">
                Mission Statement
              </div>
              <div
                className="text-md font-normal"
                dangerouslySetInnerHTML={{ __html: content?.mission_statement }}
              ></div>
            </div>
          </div>
        </article>
        <Divider />
      </section>
    </main>
  );
};

export default MissionAndVision;
