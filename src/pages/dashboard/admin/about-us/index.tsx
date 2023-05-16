import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import React from "react";
import {Tabs} from "@mantine/core";
import {IconMessageCircle, IconPhoto, IconSettings} from "@tabler/icons";
import ExploreIHM from "@/components/modules/DashboardModule/AboutUs/ExploreIHM";
import OurStory from "@/components/modules/DashboardModule/AboutUs/OurStory";
import Details from "@/components/modules/DashboardModule/AboutUs/Details";
import CompanyProfile from "@/components/modules/DashboardModule/AboutUs/CompanyProfile";
import MessageFromMD from "@/components/modules/DashboardModule/AboutUs/MessageFromMD";
import WhyExploreIHM from "@/components/modules/DashboardModule/AboutUs/WhyExploreIHM";
import MissionVision from "@/components/modules/DashboardModule/AboutUs/MissionVision";
import MessageFromPD from "@/components/modules/DashboardModule/AboutUs/MessageFromPD";

const AboutUs = () =>{


    return (


        <Tabs defaultValue="exploreIHM">
            <Tabs.List grow>
                <Tabs.Tab value="exploreIHM">Explore IHM</Tabs.Tab>
                <Tabs.Tab value="story">Our Story</Tabs.Tab>
                <Tabs.Tab value="details" >Details</Tabs.Tab>

                <Tabs.Tab value="profile" >Company Profile</Tabs.Tab>
                <Tabs.Tab value="message-pd" >Message - Program Director </Tabs.Tab>
                <Tabs.Tab value="explore" >Why Explore IHM?</Tabs.Tab>
                <Tabs.Tab value="mission" >Mission & Vision?</Tabs.Tab>
                <Tabs.Tab value="message-md" >Message - Managing Director </Tabs.Tab>


            </Tabs.List>

            <Tabs.Panel value="exploreIHM" pt="xs">
             <ExploreIHM/>
            </Tabs.Panel>

            <Tabs.Panel value="story" pt="xs">
                <OurStory/>
            </Tabs.Panel>

            <Tabs.Panel value="details" pt="xs">
              <Details/>
            </Tabs.Panel>
            <Tabs.Panel value="profile" pt="xs">
              <CompanyProfile/>
            </Tabs.Panel>
            <Tabs.Panel value="message-pd" pt="xs">
                <MessageFromPD/>

            </Tabs.Panel>
            <Tabs.Panel value="explore" pt="xs">
               <WhyExploreIHM/>
            </Tabs.Panel>
            <Tabs.Panel value="mission" pt="xs">
             <MissionVision/>
            </Tabs.Panel>
            <Tabs.Panel value="message-md" pt="xs">
                <MessageFromMD/>

            </Tabs.Panel>
        </Tabs>
    )
}
AboutUs.Layout = AdminDashboardLayout
export  default AboutUs