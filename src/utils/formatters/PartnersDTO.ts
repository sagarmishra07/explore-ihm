import moment from "moment";
export const PartnersDTO = {
    create: (data: any) => {
        return {
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
            keyword:data?.keyword || ''
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",

            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
            keyword:data?.keyword || ''
        }
    },
}