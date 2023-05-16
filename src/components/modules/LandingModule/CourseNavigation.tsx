import { IconAward, IconBook2, IconBulb, IconUser } from "@tabler/icons";
const CourseNavigation = () => {
  return (
    <>
      <section className="dynamic-x-padding grid  grid-cols-2 md:grid-cols-4 gap-10 mt-12">
        <article
          data-aos="flip-left"
          className="rounded-md border-solid p-10  text-primary hover:bg-red-600 hover:text-white font-bold border-red-600"
        >
          <div className="text-center">
            <IconBook2 size={60} />
          </div>
          <div className="text-bold text-md md:text-xl text-center ">
            Trending <br /> <span>Courses</span>
          </div>
        </article>
        <article
          data-aos="flip-left"
          className="rounded-md border-solid p-10  text-primary hover:bg-red-600 hover:text-white font-bold border-red-600"
        >
          <div className="text-center">
            <IconUser size={60} />
          </div>
          <div className="text-bold text-center text-md md:text-xl">
            Best <br /> <span>Teachers</span>
          </div>
        </article>
        <article
          data-aos="flip-left"
          className="rounded-md border-solid p-10  text-primary hover:bg-red-600 hover:text-white font-bold border-red-600"
        >
          <div className="text-center">
            <IconBulb size={60} />
          </div>
          <div className="text-bold text-center text-md md:text-xl">
            Expand <br /> <span> Knowledge</span>
          </div>
        </article>
        <article
          data-aos="flip-left"
          className="rounded-md border-solid p-10  text-primary hover:bg-red-600 hover:text-white font-bold border-red-600"
        >
          <div className="text-center">
            <IconAward size={60} />
          </div>
          <div className="text-bold text-center  text-md md:text-xl">
            Excellence <br /> <span>Awards</span>
          </div>
        </article>
      </section>
    </>
  );
};

export default CourseNavigation;
