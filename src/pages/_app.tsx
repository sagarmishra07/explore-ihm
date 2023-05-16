import DefaultLayout from "@/layouts/DefaultLayout";
import {MainTheme} from "@/plugins/theme";
import {store} from "@/store/store";
import "@/assets/scss/styles.scss";
import Head from "next/head";
import {Provider} from "react-redux";
import {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fontsource/roboto";

export default function App({Component, pageProps}: any) {
    const Layout = Component.Layout || DefaultLayout;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (loading) {
            setLoading(false);
            AOS.init({
                duration: 1000,
                easing: "ease-in-out",
                once: false,
            });
        }
    }, [loading]);

    return (
        <>
           
                    <Head>
                        <meta charSet="utf-8"/>
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                        <meta
                            name="viewport"
                            content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no"
                        />
                        <meta name="description" content="Hotel Management College In Kathmandu"/>

                        <meta property="og:title" content="Explore IHM"/>
                        <meta property="og:description" content="Hotel Management"/>
                        <meta property="og:image" content="svg image url"/>

                        <meta name="keywords" content="Explore IHM"/>
                        <title>Explore IHM</title>

                        <meta name="theme-color" content="#317EFB"/>
                    </Head>
                    <Provider store={store}>
                        <MainTheme>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </MainTheme>
                    </Provider>
                </>
           

    );
}
