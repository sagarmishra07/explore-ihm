import moment from "moment";
export const MessageFromMDDTO = {
    create: (data: any) => {
        return {
            imageUrl: data?.imageUrl || "",
            description:data?.description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any) => {
        return {
            student_name: data?.student_name || "",
            imageUrl: data?.imageUrl || "",
            description:data?.description || "",

            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}