import moment from "moment";
export const CareerDTO = {
    create: (data: any) => {
        return {
            header:data?.header || "",
            title: data?.title || "",
            slug: data?.header.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl:data?.imageUrl || "",
            description: data?.description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            title: data?.title || "",
            header:data?.header || "",
            imageUrl:data?.imageUrl || "",

            slug: data?.slug || "",
            key:data?.key || "",
            description: data?.description || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}