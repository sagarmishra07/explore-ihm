
import {Divider, Group, Avatar } from "@mantine/core";


const Team = (props: any) => {
  const { content } = props;

  return (
    <main className="px-5">
      <section className="">
        <Group>
          <section>
            <article className="text-primary uppercase gap-3 font-bold text-lg">
              Explore IHM
            </article>
            <article className="md:py-3 py-2">
              <div className="w-[14rem] font-extrabold md:text-4xl uppercase">
                Our Team
              </div>
            </article>
          </section>

          <Divider orientation="vertical" size={"xl"} color="red" />
          <article className="w-[18rem]">
            <span>
            Our team is passionate about teaching and are committed to providing 
            our students with the best possible learning experience.
            </span>
          </article>
        </Group>
      </section>
      <section className="grid grid-cols-12 gap-4 mt-16">
        {content?.map((val: any, idx: any) => (
          <div className="md:col-span-4 col-span-6" key={idx}>
            <div className="flex justify-center">
              <Avatar
                src={val?.imageUrl}
                className="rounded-full border-solid border-4 border-white h-44 w-44  text-center"
              />
            </div>
            <div className="text-xl font-bold text-center">
              {val?.member_name}
            </div>
            <div className="text-center text-bold text-gray-500 font-normal">
              {val?.position}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Team;
