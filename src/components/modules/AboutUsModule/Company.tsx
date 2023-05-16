import Welcome2 from "../../../assets/images/welcome2.svg";
import About2 from "../../../assets/images/About2.svg";
import About3 from "../../../assets/images/About3.svg";
import {Divider} from "@mantine/core";
import React from "react";

const Company = (props: any) => {
    return (
        <main className="px-5 ">
            <section className="grid grid-cols-12 gap-4">
                <section className="md:col-span-8 col-span-12">
                    <article className="text-primary uppercase gap-3 font-bold text-lg">
                        Explore IHM
                    </article>
                    <article className="py-3">
                        <div className="font-extrabold md:text-4xl text-xl  uppercase">
                            Explore Institute of <br/> Hotel Management
                        </div>
                        <Divider className="w-[5rem]" color={"red"} size={"xl"}/>
                    </article>
                    <article
                        className="text-md font-normal"
                        dangerouslySetInnerHTML={{__html: props?.content?.description}}
                    ></article>
                </section>
                <section className="md:col-span-4 col-span-12">
                    <div className="grid grid-cols-4 gap-4 p-4">
                        <div className="shadow-lg rounded-lg col-span-4 "
                             style={{position: "relative", width: "105%", height: "200px"}}>
                            <img loading={"lazy"}
                                // data-aos="zoom-in"
                                 src={Welcome2.src}
                                 alt="Explore IHM"
                                 className="rounded-xl rotate-12 object-cover"
                            />

                        </div>
                        <div className="shadow-lg rounded-lg col-span-2 "
                             style={{position: "relative", width: "110%", height: "150px"}}>
                            <img loading={"lazy"}
                                // data-aos="zoom-in"
                                 src={About2.src}
                                 alt="Explore IHM"
                                 className="rounded-xl rotate-12 object-cover"
                            />

                        </div>
                        <div className="shadow-lg rounded-lg col-span-2"
                             style={{position: "relative", width: "110%", height: "150px"}}>
                            <img loading={"lazy"}
                                // data-aos="zoom-in"
                                 src={About3.src}
                                 alt="Explore IHM"
                                 className="rounded-xl rotate-12 object-cover"
                            />

                        </div>
                        {/* <div className="shadow-lg p-2 bg-red-600 rounded-lg col-span-4">
              <div className="text-center font-bold text-md text-white">
                Explore Us
              </div>
              <Divider />
              <div className="flex justify-center pt-2">
                <div>Lorem ipsum dolor sit dolor sit dolor sitdolor sit</div>
              </div>
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  className="rounded-xl text-white border-white"
                  uppercase
                >
                  View More
                </Button>
              </div>
            </div> */}
                    </div>
                    {/* {serviceItem?.map((val: any) => (
            <Image src={val.url} alt="" />
          ))} */}
                </section>
            </section>
        </main>
    );
};
export default Company;
