import { Divider } from "@mantine/core";
import {
  IconPhoneCall,
  IconMail,
  IconMapPin,
  IconBrandFacebook,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons";
import FooterLogo from "./FooterLogo";
import { useRouter } from "next/router";
const Footer = (props: any) => {
  const router = useRouter();
  const { content } = props;
  return (
    <>
      <footer className="bg-dark dynamic-x-padding  py-10 text-white">
        <main className="grid grid-cols-12 gap-6">
          <section className="md:col-span-8 col-span-12">
            <div className="space-y-1">
              <div className="text-xl font-bold">Explore IHM</div>
              <Divider className="w-[100px] bg-gray-500" size={"xl"} />
            </div>
            <article className="grid grid-cols-12">
              <div className="md:col-span-6 col-span-12 space-y-3">
                <div className="pt-6 space-y-3.5 ">
                  <div
                    className="text-xl font-bold capitalize cursor-pointer text-left"
                    onClick={() => router.push("/about-us/company")}
                  >
                    Company Profile
                  </div>
                  <div className="space-y-3.5">
                    <div
                      className="text-lg font-medium cursor-pointer text-left"
                      onClick={() => router.push("/about-us/explore")}
                    >
                      Why Explore IHM ?
                    </div>
                    <div
                      className="text-lg font-medium cursor-pointer text-left"
                      onClick={() => router.push("/about-us/our-team")}
                    >
                      Our Team
                    </div>
                    <div
                      className="text-lg font-medium cursor-pointer text-left"
                      onClick={() => router.push("/our-blogs")}
                    >
                      Blogs
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="pt-6 space-y-3.5">
                  <div
                    className="text-xl font-bold capitalize cursor-pointer text-left"
                    onClick={() => router.push("/courses")}
                  >
                    OUR POPULAR COURSES
                  </div>
                  <div className="space-y-3.5">
                    <div
                      className="text-lg font-medium cursor-pointer justify-left  w-[17rem] pr-8 text-left"
                      onClick={() =>
                        router.push(
                          "/courses/extra/professional-diploma-in-hotel-management"
                        )
                      }
                    >
                      Professional Diploma in Hotel Management
                    </div>
                    {/*<div*/}
                    {/*  className="text-lg font-medium cursor-pointer"*/}
                    {/*  onClick={() =>*/}
                    {/*    router.push(*/}
                    {/*      "/courses/extra/hospitality-english-language"*/}
                    {/*    )*/}
                    {/*  }*/}
                    {/*>*/}
                    {/*  Hospitality English Language*/}
                    {/*</div>*/}
                    <div
                      className="text-lg font-medium cursor-pointer text-left"
                      onClick={() =>
                        router.push("/courses/extra/diploma-in-culinary-arts")
                      }
                    >
                      Diploma in Culinary Arts
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 col-span-12  space-y-3">
                <div className="md:pt-12 space-y-3.5 md:pb-1">
                  <div className="text-xl font-bold hidden md:visible text-left">
                    Company Profile
                  </div>
                  <div className="space-y-3.5">
                    <div
                      className="text-lg font-medium cursor-pointer text-left"
                      onClick={() => router.push("/about-us/message-md")}
                    >
                      Message - Managing Director
                    </div>
                    <div
                      className="text-lg font-medium cursor-pointer  text-left"
                      onClick={() => router.push("/about-us/mission")}
                    >
                      Mission & Vision
                    </div>
                    <div
                      className="text-lg font-medium cursor-pointer  text-left"
                      onClick={() => router.push("/testimonials")}
                    >
                      Students Testimonials
                    </div>
                  </div>
                </div>
                <Divider />
                <div className="md:pt-12 space-y-3.5">
                  <div className="text-xl font-bold hidden md:visible  text-left">
                    Company Profiles
                  </div>
                  <div className="space-y-3.5">
                    <div
                      className="text-lg font-medium cursor-pointer text-left"
                      onClick={() =>
                        router.push(
                          "/courses/extra/certificate-program-in-barista-training"
                        )
                      }
                    >
                      Certificate Course in Barista Training
                    </div>
                    <div
                      className="cursor-pointer text-lg font-medium text-left"
                      onClick={() =>
                        router.push("/courses/extra/food-production")
                      }
                    >
                      Food Production
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
          <section
            className="md:col-span-4 col-span-12 pl-6"
            style={{ borderLeft: "2px solid white" }}
          >
            <div
              data-aos="fade-left"
              style={{ height: "110px", width: "190px" }}
            >
              <FooterLogo />
            </div>
            <div className="space-y-1 invisible ">
              <div className="text-xl font-bold">Explore IHM</div>
              <Divider className="md:w-[100px] bg-gray-500" size={"xl"} />
            </div>
            <div className="space-y-3.5 ">
              <article className="flex items-center text-left">
                <div>
                  <IconPhoneCall />
                </div>
                <div className="text-md font-semibold pl-2 text-left">
                  {content?.phone}
                </div>
              </article>
              <article className="flex items-center text-left">
                <div>
                  <IconMail />
                </div>
                <div className="text-md font-semibold pl-2 text-left">
                  {content?.email}
                </div>
              </article>
              <article className="flex items-center text-left">
                <div>
                  <IconMapPin />
                </div>
                <div className="text-md font-semibold pl-2 text-left">
                  {content?.address}
                </div>
              </article>
              <article className="flex items-center space-x-3 pl-8">
                <div
                  className={"cursor-pointer"}
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/exploreinstituteofhotelmanagement",
                      "_blank"
                    )
                  }
                >
                  <IconBrandFacebook size={"30"} />
                </div>
                <div
                  className={"cursor-pointer"}
                  onClick={() =>
                    window.open("https://www.instagram.com/explore_ihm/", "_blank")
                  }
                >
                  <IconBrandInstagram size={"30"} />
                </div>
                <div
                 className={"cursor-pointer"}
                 onClick={() =>
                   window.open("https://www.tiktok.com/@exploreihm", "_blank")
                 }>
                  <IconBrandTiktok size={"30"} />
                </div>
                <div
                className={"cursor-pointer"}
                onClick={()=>
                  window.open("https://www.linkedin.com/company/explore-ihm", "_blank")
                }>
                  <IconBrandLinkedin size={"30"} />
                </div>
                <div>
                  <IconBrandYoutube size={"30"} />
                </div>
              </article>
              <article>
                <div
                  className="text-lg font-bold capitalize pt-15 cursor-pointer text-left"
                  onClick={() => router.push("/about-us/company")}
                >
                  Explore About Us
                </div>
              </article>
            </div>
          </section>
        </main>
      </footer>
      <section className="md:h-14 bg-primary text-white flex items-center justify-center">
        <div className="text-lg text-medium font-bold text-center text-left">
          Copyright © Explore IHM 2023. All right reserved. Designed and
          developed by{" "}
          <span
            className={"underline cursor-pointer text-left "}
            onClick={() => window.open("https://smartlyyours.com/")}
          >
            Smartly Yours
          </span>
        </div>
      </section>
    </>
  );
};

export default Footer;
