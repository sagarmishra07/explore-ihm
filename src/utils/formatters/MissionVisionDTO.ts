import moment from "moment";
export const MissionVisionDTO = {
    create: (data: any) => {
        return {
            mission:data?.mission || "",
            vision:data?.vision || "",
            mission_statement:data?.mission_statement || "",

        }
    },

    receive: (data: any) => {
        return {
            mission:data?.mission || "",
            vision:data?.vision || "",
            mission_statement:data?.mission_statement || "",

        }
    },
}