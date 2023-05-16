import Header from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";
import {useEffect, useState} from "react";
import {firebaseGet} from "@/api/firebase";
import {useWindowScroll} from "@mantine/hooks";
import {Affix, Button, Transition} from "@mantine/core";
import {IconArrowUp} from "@tabler/icons";
import {useRouter} from "next/router";

const MainLayout = ({children}: any) => {
    const [scroll, scrollTo] = useWindowScroll();
    const router = useRouter()
    const [details, setDetails] = useState<any>({});
    const getAllDetails = async () => {
        const res: any = await firebaseGet(`landing/Details`);
        setDetails(res);
    };
    useEffect(() => {
        let unsubscribe: any;
        if (router.isReady) {
            unsubscribe = getAllDetails().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);
    return (
        <main>
            <Header/>
            {children}
            <Affix position={{bottom: 20, right: 20}}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            className={"bg-primary text-white"}
                            leftIcon={<IconArrowUp size="2rem"/>}
                            style={transitionStyles}
                            onClick={() => scrollTo({y: 0})}
                        >
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
            <Footer content={details}/>
        </main>
    );
};

export default MainLayout;
