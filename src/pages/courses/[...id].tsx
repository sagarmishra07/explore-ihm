import { Breadcrumbs, Button, Divider, Paper } from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { firebaseGetDataByQuery } from "@/api/firebase";
import { FirebaseDTO } from "@/utils/formatters/FirebaseDTO";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IconArrowRight } from "@tabler/icons";
import Loading from "@/components/common/Loading";

const CourseDetails = () => {
  const router = useRouter();
  const id: any = router?.query?.id;
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<any>({});
  const [otherCourses, setOtherCourses] = useState<any>([]);

  const getAllCoursesData = async () => {
    if (id) {
      setLoading(true);
      const res: any = await firebaseGetDataByQuery("/Courses", "slug", id[0]);
      const formatted: any = FirebaseDTO.receive(res);
      setCourse(formatted[0]);
      const other: any = await firebaseGetDataByQuery(
        "/ExtraCourses",
        "category",
        id[0]
      );
      const afterFormat: any = FirebaseDTO.receive(other);
      setOtherCourses(afterFormat);
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribe: any;

    if (router.isReady) {
      unsubscribe = getAllCoursesData().then((r) => r);
    }
    return () => {
      unsubscribe = [];
    };
  }, [router]);
  const slides = otherCourses?.map((item: any, idx: any) => (
    <Carousel.Slide key={idx} className="my-10 ">
      <Card {...item} />
    </Carousel.Slide>
  ));
  const items = [
    { title: "Courses", href: "/courses" },
    {
      title: `${course?.course_name}`,
      href: `/courses/${course?.course_name?.toLowerCase()}`,
    },
  ].map((item, index) => (
    <main key={index}>
      {id && (
        <span
          className={`${
            item?.href === router.pathname ? "text-primary" : "text-dark"
          } text-md uppercase  cursor-pointer `}
          key={index}
          onClick={() => router.push(item.href)}
        >
          {item.title}
        </span>
      )}
    </main>
  ));

  function Card({ imageUrl, course_name, description, slug }: any) {
    return (
      <Paper
        radius="xl"
        className="grid gap-y-4 cursor-pointer rounded-lg"
        onClick={() => router.push(`/courses/extra/${slug}`)}
      >
        <div style={{ position: "relative", height: "220px" }}>
          <img
            // data-aos="zoom-in"
            src={imageUrl}
            alt={course_name}
            className="rounded-xl rotate-12 object-cover"
          />
        </div>
        <section className="">
          <Divider size={"xl"} color="red" />
          <article className="pt-5 grid gap-3">
            <div className="flex  font-extrabold text-2xl text-left capitalize">
              {course_name}
            </div>
            <div
              className="flex  line-clamp-2 text-md font-normal text-left"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
            <Divider size={"sm"} color="gray" />
            <div
              className="flex text-primary uppercase hover:cursor-pointer items-center space-x-2"
              onClick={() => router.push(`/courses/extra/${slug}`)}
            >
              <span>READ MORE</span>
              <span>
                <IconArrowRight size={35} />
              </span>
            </div>
          </article>
        </section>
      </Paper>
    );
  }

  return (
    <>
      {!loading ? (
        <main className="dynamic-x-padding dynamic-y-padding">
          <div
            className="absolute right-0 bg-gray-200 bg-opacity-60 invisible md:visible"
            style={{
              height: "50%",
              width: "30%",
              zIndex: "-999",
            }}
          >
            <div className="h-96 pb-10 ">
              <img
                className="rounded-lg h-80 w-full object-cover"
                src={course?.imageUrl}
                alt="title"
              />
            </div>
            <Divider
              size={"xl"}
              className="w-60 absolute bottom-0  right-0"
              color={"#C00000"}
            />
          </div>

          <section className={""}>
            <Breadcrumbs separator="/" className={"space-x-3"}>
              {items}
            </Breadcrumbs>
          </section>
          <section className="py-10 z-10 ">
            <div className="">
              <p className="font-extrabold text-lg text-primary uppercase">
                EXPLORE IHM
              </p>
              <div className="md:grid grid-cols-2 gap-8 flex flex-col-reverse">
                <div>
                  <div className="py-5">
                    <p className="w-[14rem] font-extrabold text-4xl uppercase">
                      <span className={"uppercase"}>{course?.slug}</span>
                    </p>
                  </div>

                  <div className="">
                    <Divider size={"xl"} className="w-24" color={"#C00000"} />
                  </div>
                  <div
                    className={"dynamic-y-padding  text-md font-normal"}
                    dangerouslySetInnerHTML={{ __html: course?.description }}
                  ></div>

                  {course?.pdfUrl && (
                    <>
                      <div>
                        <img
                          src={course?.pdfUrl}
                          alt="PD"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button
                        className={"bg-primary text-white"}
                        onClick={() => window.open(course?.pdfUrl, "_blank")}
                      >
                        Download
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* second section */}
          </section>
          <section className="">
            <Carousel
              slideSize="33%"
              breakpoints={[
                { maxWidth: "sm", slideSize: "100%" },
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "lg", slideSize: "50%" },
              ]}
              slideGap="xl"
              align="start"
              // height={500}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              withControls={true}
              withIndicators={true}
              loop
            >
              {slides}
            </Carousel>
          </section>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};
CourseDetails.Layout = MainLayout;
export default CourseDetails;
