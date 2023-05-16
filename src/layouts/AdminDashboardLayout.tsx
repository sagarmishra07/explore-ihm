import React, {useEffect, useState} from "react";
import {
    AppShell,
    Avatar,
    Burger,
    Card,
    MediaQuery,
    Menu,
    Navbar,
    ScrollArea,
    Text,
    useMantineTheme,
} from "@mantine/core";
import {useRouter} from "next/router";
import {
    IconCurrencyDollar,
    IconDeviceDesktopAnalytics,
    IconGraph,
    IconLayoutDashboard,
    IconLogout,
    IconPencil
} from "@tabler/icons";
import {auth} from "@/firebase/firebase";
import {onAuthStateChanged, signOut} from "@firebase/auth";
import showNotify from "@/utils/notify";

export const adminDashboardNavItems = [
    {
        icon: <IconLayoutDashboard size={35} color={'white'}/>,
        title: "Dashboard",
        route: "/dashboard"
    },
    {
        icon: <IconLayoutDashboard size={35} color={'white'}/>,
        title: "Hero",
        route: "/dashboard/admin/hero"
    },
    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "About-Us",
        route: "/dashboard/admin/about-us"
    },
    {
        icon: <IconLayoutDashboard size={35} color={'white'}/>,
        title: "Teams",
        route: "/dashboard/admin/teams"
    },
    {
        icon: <IconCurrencyDollar size={35} color={'white'}/>,
        title: "Features",
        route: "/dashboard/admin/features"
    },
    {
        icon: <IconGraph size={35} color={'white'}/>,
        title: "Courses",
        route: "/dashboard/admin/courses"
    },
    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "Blog",
        route: "/dashboard/admin/blog"
    },
    {
        icon: <IconPencil size={35} color={'white'}/>,
        title: "Testimonial",
        route: "/dashboard/admin/testimonial"
    },
    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "Partners",
        route: "/dashboard/admin/partners"
    },

    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "Album",
        route: "/dashboard/admin/album"
    },
    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "Events",
        route: "/dashboard/admin/events"
    },
    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "Facilities",
        route: "/dashboard/admin/facilities"
    },

    {
        icon: <IconDeviceDesktopAnalytics size={35} color={'white'}/>,
        title: "Career",
        route: "/dashboard/admin/career"
    },


];


const AdminDashboardLayout = ({children}: any) => {
    const router = useRouter();
    const pathname = router.pathname;

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                console.log(user)
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push("/login").then((r) => r);
            }
        });

        return () => unsubscribe();
    }, [router.isReady]);
    const signOutData = async () => {
        signOut(auth).then(() => {
            router.push('/')
            showNotify("success", 'Logged Out Successfully')
        }).catch((error: any) => {
            // An error happened.
        });
    }

    return (
        <AppShell
            navbar={
                <Navbar
                    p="xs"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{xs: "95vw", sm: 50, lg: 100}}
                    className={"bg-secondary sm:bg-dark transition-transform bg-opacity-96"}
                >
                    {/* header */}
                    {/* <Navbar.Section mt="xs">
            <Image
              src={dashboardLogo}
              onClick={() => router.push("/")}
              className={"cursor-pointer"}
              height={70}
            />
          </Navbar.Section> */}

                    {/* scrollarea */}
                    <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                        <section className="flex">
                            <article>
                                {/*<Image*/}
                                {/*    src={dashboardLogo}*/}
                                {/*    onClick={() => router.push("/")}*/}
                                {/*    className={"cursor-pointer"}*/}
                                {/*    height={70}*/}
                                {/* alt={'image'}/>*/}
                                {adminDashboardNavItems.map(
                                    (item: any, idx: any) => {
                                        return (
                                            <div
                                                key={idx}
                                                className={`${
                                                    item?.route?.split("/")[3] === pathname.split("/")[3]
                                                        ? "text-primary "
                                                        : "text-secondary "
                                                } flex pb-2  items-center justify-between dynamic-y-padding  `}
                                                onClick={() => setOpened((o) => !o)}
                                            >
                                                <div

                                                    onClick={() => router.push(item?.route)}
                                                    className={`${
                                                        item?.route?.split("/")[3] ===
                                                        pathname.split("/")[3]
                                                        && "bg-primary  "

                                                    }  cursor-pointer h-[65px] w-[65px] flex items-center justify-center`}
                                                >
                                                    <section
                                                        className={
                                                            "flex flex-col justify-center items-center "
                                                        }
                                                    >
                                                        <Text size="xs" color="white">
                                                            {item?.icon}
                                                        </Text>
                                                        <Text
                                                            size="xs"
                                                            color="white"
                                                            className="tracking-wider leading-loose"
                                                        >
                                                            {item?.title}
                                                        </Text>
                                                    </section>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </article>

                        </section>
                    </Navbar.Section>

                    {/* footer section */}
                    <article className="justify-end w-16">
                        <Menu trigger="hover">
                            <Menu.Target>
                                <Card
                                    p="sm"
                                    radius="lg"
                                    className="flex items-center justify-center"
                                >
                                    <Avatar color="blue">A</Avatar>

                                </Card>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={<IconLogout size={12}/>}
                                    className={"p-0"}
                                    onClick={() => signOutData()}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </article>
                </Navbar>
            }
        >
            <div className={""}>
                {!opened && (
                    <div className={" flex justify-end"}>
                        <MediaQuery largerThan="sm" styles={{display: "none"}}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[7]}
                            />
                        </MediaQuery>
                    </div>
                )}
                <div className={"py-5 "}>{isAuthenticated ? children : null}</div>
            </div>
        </AppShell>
    );
};
export default AdminDashboardLayout;
