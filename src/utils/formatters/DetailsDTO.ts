import moment from "moment";
export const DetailsDTO = {
    create: (data: any) => {
        return {
            email:data?.email || "",
            whatsApp: data?.whatsApp || "",
            phone: data?.phone || "",
            address:data?.address || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any) => {
        return {
            email:data?.email || "",
            whatsApp: data?.whatsApp || "",
            phone: data?.phone || "",
            address:data?.address || "",

            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}