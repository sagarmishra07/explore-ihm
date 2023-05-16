import { Button, Divider, Group, Card } from "@mantine/core";
import Image from "next/image";
import { FirebaseDTO } from "@/utils/formatters/FirebaseDTO";
import { useRouter } from "next/router";

const Gallery = ({ content }: any) => {
  const router = useRouter();
  const rows = content?.map((v: any) => ({
    album_title: v?.album_title || "",
    key: v?.key || "",
    gallery: FirebaseDTO.receive(v?.gallery),
  }));
  return (
    <main className="dynamic-x-padding mt-16">
      <section className="">
        <Group>
          <section>
            <article
              data-aos="fade-right"
              className="text-primary uppercase gap-3 font-bold text-lg"
            >
              Explore IHM
            </article>
            <article data-aos="fade-up" className="py-3">
              <div className="md:w-[16rem] font-extrabold text-3xl md:text-4xl uppercase">
                Our Gallery
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
              Our gallery is a showcase of the talent and creativity of our
              community, and we are proud to share it with you.
            </span>
          </article>
        </Group>
      </section>

      <section className="grid md:grid-cols-4 gap-4 mt-16">
        {rows?.map((val: any, idx: number) => (
          <Card
            p="lg"
            radius="md"
            className="hover:cursor-pointer space-y-4"
            key={idx}
            onClick={() => router.push(`/gallery/${val?.key}`)}
          >
            <Card.Section style={{ position: "relative", height: "220px" }}>
              <img
                // data-aos="zoom-in"
                src={val?.gallery[0]?.imageUrl}
                alt={val?.album_title}
                className="rounded-xl rotate-12 object-cover"
              />
            </Card.Section>

            <Card.Section className="flex capitalize justify-center font-extrabold text-2xl">
              <div data-aos="fade-up "> {val?.album_title}</div>
            </Card.Section>
            <Card.Section className="flex justify-center text-primary text-md font-semibold">
              <div data-aos="fade-up text-primary">
                {val?.gallery?.length} photos
              </div>
            </Card.Section>
          </Card>
        ))}
      </section>
      <div className="flex justify-center pt-8">
        <Button
          variant="outline"
          color="red"
          className="rounded-xl hover:bg-primary hover:text-white"
          uppercase
          onClick={() => router.push("/gallery")}
        >
          View More
        </Button>
      </div>
    </main>
  );
};

export default Gallery;
