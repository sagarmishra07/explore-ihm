import moment from "moment";
export const ExploreIHMDTO = {
    create: (data: any) => {
        return {
            key: data?.key || "",
            description:data?.description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any) => {
        return {
            key:data?.key || "",
            description:data?.description || "",

            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}