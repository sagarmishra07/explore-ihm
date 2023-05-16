import moment from "moment";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
export const LandingDTO = {

    receive: (data: any) => {
        return {
           Hero: FirebaseDTO.receive(data?.Hero) || [],
            ExploreIHM: {
               description:data?.ExploreIHM?.description || ""
            },
            Features: FirebaseDTO.receive(data?.Features) || [],
            OurStory: {
                description:data?.OurStory?.description || ""
            },
            Album: FirebaseDTO.receive(data?.Album) || [],

            Blogs: FirebaseDTO.receive(data?.Blogs) || [],
            Testimonial: FirebaseDTO.receive(data?.Testimonial) || [],
            Partners: FirebaseDTO.receive(data?.Partners) || [],

            Details: {
                address:data?.Details?.address || "",
                createdAt:data?.Details?.createdAt || "",
                email:data?.Details?.email || "",
                phone:data?.Details?.phone || "",
                whatsApp:data?.Details?.whatsApp || "",




            },
        }
    },
}