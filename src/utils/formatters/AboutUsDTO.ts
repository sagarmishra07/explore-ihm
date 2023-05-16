import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
export const AboutUsDTO = {

    receive: (data: any) => {
        console.log(data)
        return {

            CompanyProfile: {
                description:data?.CompanyProfile?.description || "",

            },
            MessageFromMD: {
                description:data?.MessageFromMD?.description || "",
                imageUrl:data?.MessageFromMD?.imageUrl || "",

            },
            MessageFromPD: {
                description:data?.MessageFromPD?.description || "",
                imageUrl:data?.MessageFromPD?.imageUrl || "",

            },
            MissionVision: {
                mission:data?.MissionVision?.mission || "",
                vision:data?.MissionVision?.vision || "",
                mission_statement:data?.MissionVision?.mission_statement || "",

            },
            Teams:FirebaseDTO.receive(data?.Teams) || [],
            WhyExploreIHM:{
                description:data?.WhyExploreIHM?.description || ""
            }
        }
    },
}