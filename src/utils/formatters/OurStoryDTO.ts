import moment from "moment";
export const OurStoryDTO = {
    create: (data: any) => {
        return {
            description:data?.description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any) => {
        return {
            description:data?.description || "",

            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}