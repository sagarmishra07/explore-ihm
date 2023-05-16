import {MediaQuery, Tabs} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import Company from "@/components/modules/AboutUsModule/Company";
import Message from "@/components/modules/AboutUsModule/Message";
import WhyExplore from "@/components/modules/AboutUsModule/WhyExplore";
import MissionAndVision from "@/components/modules/AboutUsModule/MissionVision";
import MessageMd from "@/components/modules/AboutUsModule/MessageMd";
import Team from "@/components/modules/AboutUsModule/Team";
import {firebaseGet} from "@/api/firebase";
import {useEffect, useState} from "react";
import {AboutUsDTO} from "@/utils/formatters/AboutUsDTO";
import Loading from "@/components/common/Loading";
import {useRouter} from "next/router";

const AboutUs = () => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const getAllData = async () => {
        if (router.query.tabName as string) {

            setLoading(true);
            const res = await firebaseGet("AboutUs");
            const formatted: any = AboutUsDTO.receive(res);
            setData(formatted);
            setLoading(false);
        }

    };
    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllData().then((r) => r);
        }
        return () => {
            unsubscribe = []


        };
    }, [router.isReady]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding md:mt-16 md:mb-32 my-4">
                    <MediaQuery smallerThan={"md"} styles={{display: "none"}}>
                        <Tabs
                            defaultValue={router.query.tabName as string}
                            orientation="vertical"
                            value={router.query.tabName as string}
                            onTabChange={(value) => router.push(`/about-us/${value}`)}
                            styles={(theme) => ({
                                tab: {
                                    "&[data-active]": {
                                        backgroundColor: theme.colors.red[7],
                                        borderColor: theme.colors.red[7],
                                        color: theme.white,
                                    },
                                },
                                tabLabel: {
                                    padding: '8px'
                                },
                                tabIcon: {
                                    marginRight: theme.spacing.xs,
                                    display: "flex",
                                    alignItems: "center",
                                },

                                tabsList: {
                                    display: "flex ",
                                },
                            })}
                        >
                            {}
                            <Tabs.List className="space-y-2">
                                <Tabs.Tab
                                    value="company"
                                    className="uppercase text-xl font-bold pl-1"
                                >
                                    Company Profile
                                </Tabs.Tab>

                                <Tabs.Tab
                                    value="message-pd"
                                    className="uppercase text-xl font-bold pl-1"
                                >
                                    Message - Program Director{" "}
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="explore"
                                    className="uppercase text-xl font-bold pl-1"
                                >
                                    Why Explore IHM?
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="mission"
                                    className="uppercase text-xl font-bold pl-1"
                                >
                                    Mission & Vision?
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="message-md"
                                    className="uppercase text-xl font-bold pl-1"
                                >
                                    Message - Managing Director{" "}
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="our-team"
                                    className="uppercase text-xl font-bold pl-1"
                                >
                                    Our Team
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="company" pt="xs">
                                <Company content={data?.CompanyProfile}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="message-pd" pt="xs">
                                <Message content={data?.MessageFromPD}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="explore" pt="xs">
                                <WhyExplore content={data?.WhyExploreIHM}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="mission" pt="xs">
                                <MissionAndVision content={data?.MissionVision}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="message-md" pt="xs">
                                <MessageMd content={data?.MessageFromMD}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="our-team" pt="xs">
                                <Team content={data?.Teams}/>
                            </Tabs.Panel>
                        </Tabs>
                    </MediaQuery>

                    <MediaQuery largerThan={"sm"} styles={{display: "none"}}>
                        <Tabs
                            defaultValue={router.query.tabName as string}
                            orientation="horizontal"
                            value={router.query.tabName as string}
                            onTabChange={(value) => router.push(`/about-us/${value}`)}
                            styles={(theme) => ({
                                tab: {
                                    "&[data-active]": {
                                        backgroundColor: theme.colors.red[7],
                                        borderColor: theme.colors.red[7],
                                        color: theme.white,
                                    },
                                },

                                tabIcon: {
                                    marginRight: theme.spacing.xs,
                                    display: "flex",
                                    alignItems: "center",
                                },

                                tabsList: {
                                    display: "flex",
                                },
                            })}
                        >
                            <Tabs.List>
                                <Tabs.Tab value="company" className="uppercase font-semibold">
                                    Company Profile
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="message-pd"
                                    className="uppercase font-semibold"
                                >
                                    Message - Program Director{" "}
                                </Tabs.Tab>
                                <Tabs.Tab value="explore" className="uppercase font-semibold">
                                    Why Explore IHM?
                                </Tabs.Tab>
                                <Tabs.Tab value="mission" className="uppercase font-semibold">
                                    Mission & Vision?
                                </Tabs.Tab>
                                <Tabs.Tab
                                    value="message-md"
                                    className="uppercase font-semibold"
                                >
                                    Message - Managing Director
                                </Tabs.Tab>
                                <Tabs.Tab value="our-team" className="uppercase font-semibold">
                                    Our Team
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="company" pt="xs">
                                <Company content={data?.CompanyProfile}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="message-pd" pt="xs">
                                <Message content={data?.MessageFromPD}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="explore" pt="xs">
                                <WhyExplore content={data?.WhyExploreIHM}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="mission" pt="xs">
                                <MissionAndVision content={data?.MissionVision}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="message-md" pt="xs">
                                <MessageMd content={data?.MessageFromMD}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="our-team" pt="xs">
                                <Team content={data?.Teams}/>
                            </Tabs.Panel>
                        </Tabs>
                    </MediaQuery>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
AboutUs.Layout = MainLayout;
export default AboutUs;
