import {Burger, Button, Divider, Drawer, Grid, MediaQuery,} from "@mantine/core";
import {navItems} from "@/utils/constants/navItems";
import {useRouter} from "next/router";
import Logo from "./Logo";
import {useState} from "react";
import Star from "../../assets/images/star.png";
import ETVA from "@/assets/images/ETVA.png";
import Image from "next/image";
import Header from "./Header";

const Navbar = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const [opened, setOpened] = useState(false);
    const title = opened ? "Close navigation" : "Open navigation";
    return (
        <>
            {/* header */}
            <section>
                <Header/>
            </section>

            <section
                className={
                    "flex justify-between sticky top-0 items-center dynamic-x-padding  z-50 bg-white shadow-md gap-16"
                }
            >
                {/* logo */}
                <div onClick={() => router.push("/")} className={"cursor-pointer"}>
                    <Logo/>
                </div>

                {/* navitems */}
                <section className="grid space-y-5">
                    <article className="pt-4">
                        <Grid className={"flex items-center justify-end gap-x-10  "}>


                            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                                <div onClick={() => router.push("/courses/ctevt")}>
                  <span
                      className={` text-dark text-xl font-semibold hover:text-primary cursor-pointer `}
                  >
                    <Image src={Star} alt={"logo"} quality={100}/>
                  </span>
                                </div>
                            </MediaQuery>

                            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                                <div onClick={() => router.push("/courses/etva")}>
                  <span
                      className={` text-dark text-xl font-semibold hover:text-primary cursor-pointer `}
                  >
                    <Image src={ETVA} alt={"logo"} quality={100}/>
                  </span>
                                </div>
                            </MediaQuery>

                            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                                <Grid>
                                    <Button
                                        color={"red"}
                                        onClick={() => router.push("/career")}
                                        uppercase
                                        radius={"xl"}
                                        className="shadow-lg"
                                    >
                                        Career
                                    </Button>
                                </Grid>
                            </MediaQuery>
                            <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                                <div>
                  <span
                      className={` text-dark text-xl font-semibold hover:text-primary cursor-pointer `}
                  >
                  <Button
                      color={"red"}
                      onClick={() => router.push("/career")}
                      uppercase
                      radius={"xl"}
                      className="shadow-lg"
                  >
                    Admission Form
                  </Button>
                  </span>
                                </div>
                            </MediaQuery>
                        </Grid>
                    </article>
                    <Divider/>
                    <article className="pb-4">
                        <Grid className={"flex items-center gap-x-10 py-5"}>
                            {navItems.map((item, idx) => (
                                <MediaQuery
                                    smallerThan={"md"}
                                    styles={{display: "none"}}
                                    key={idx}
                                >
                                    <div
                                        className={`${
                                            pathname === item.route ? "active" : ""
                                        }   font-bold`}
                                        onClick={() => router.push(item.route)}
                                    >
                    <span
                        className={`${
                            item?.route.split("/")[1] === pathname.split("/")[1]
                                ? "underline underline-offset-[4px] text-primary "
                                : "text-black "
                        }  text-xl font-semibold hover:text-primary cursor-pointer `}
                        // className={
                        //   ""
                        // }
                    >
                      {item.title}
                    </span>
                                    </div>
                                </MediaQuery>
                            ))}

                            {/* <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Grid className={""}>
              <Button
                variant={"subtle"}
                onClick={() => router.push("/login/admin")}
              >
                Login
              </Button>
            </Grid>
          </MediaQuery> */}
                        </Grid>
                    </article>
                </section>
                <MediaQuery largerThan={"md"} styles={{display: "none"}}>
                    <Burger
                        color={"#D52727"}
                        opened={opened}
                        onClick={() => setOpened((v) => !v)}
                        title={title}
                    />
                </MediaQuery>

                {/* for mobile */}
                <Drawer
                    opened={opened}
                    onClose={() => setOpened(false)}
                    padding="sm"
                    size="sm"
                    position="right"
                >
                    {navItems.map((item, id) => (
                        <div key={id}>
                            <div
                                onClick={() => [setOpened((v) => !v), router.push(item.route)]}
                                color={"black"}
                                style={{marginTop: "2rem"}}
                                className={`${
                                    pathname === item.route ? "active" : ""
                                } text-center cursor-pointer`}
                            >
                                {item.title}
                            </div>
                        </div>
                    ))}
                    <MediaQuery
                        largerThan={"md"}
                        styles={{}}
                        className="py-8 flex justify-center"
                    >
                        <Grid>
                            <Button
                                color={"red"}
                                onClick={() => router.push("/career")}
                                uppercase
                                radius={"xl"}
                                className="shadow-lg"
                            >
                                Career
                            </Button>
                        </Grid>
                    </MediaQuery>
                </Drawer>
            </section>
        </>
    );
};

export default Navbar;
