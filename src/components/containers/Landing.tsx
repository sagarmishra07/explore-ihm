import {firebaseGet} from "@/api/firebase";
import React, {useEffect, useState} from "react";
import CommonHead from "../common/CommonHead";
import {useRouter} from "next/router";
import {LandingDTO} from "@/utils/formatters/LandingDTO";
import Loading from "@/components/common/Loading";
import dynamic from 'next/dynamic';
import OurBlogs from "@/components/modules/LandingModule/OurBlogs";

const HeroSection = dynamic(() => import("../modules/LandingModule/HeroSection"));
const WelcomeSection = dynamic(() => import("../modules/LandingModule/WelcomeSection"));

const CourseNavigation = dynamic(() => import("../modules/LandingModule/CourseNavigation"));
const Gallery = dynamic(() => import("../modules/LandingModule/Gallery"));
// const OurBlogs = dynamic(() => import("../modules/LandingModule/OurBlogs"));
const OurFeatures = dynamic(() => import("../modules/LandingModule/OurFeatures"));
const OurStory = dynamic(() => import("../modules/LandingModule/OurStory"));
const PopularCourses = dynamic(() => import("../modules/LandingModule/PopularCourses"));
const Sponser = dynamic(() => import("../modules/LandingModule/Sponser"));
const Testomonial = dynamic(() => import("../modules/LandingModule/Testomonial"));

const Landing = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>({})
    const getAllLandingData = async () => {
        setLoading(true)
        const res: any = await firebaseGet("landing");
        const formatted: any = LandingDTO.receive(res)
        setData(formatted)
        setLoading(false)
    };

    useEffect(() => {
        let unsubscribe: any;
        if (router.isReady) {
            unsubscribe = getAllLandingData().then(r => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);

    return (
        <main>
            {
                !loading ? (
                    <>
                        <CommonHead title={"Explore IHM"}/>
                        <HeroSection content={data?.Hero}/>
                        <CourseNavigation/>
                        <WelcomeSection content={data?.ExploreIHM}/>
                        <PopularCourses/>
                        <OurFeatures content={data?.Features}/>
                        <OurStory content={data?.OurStory}/>
                        <Gallery content={data?.Album}/>
                        <OurBlogs content={data?.Blogs}/>
                        <Testomonial content={data?.Testimonial}/>
                        <Sponser content={data?.Partners}/>
                        {/*<Contact content={data?.Details} />*/}
                    </>
                ) : (
                    <Loading/>
                )
            }


        </main>
    );
};

export default Landing;
