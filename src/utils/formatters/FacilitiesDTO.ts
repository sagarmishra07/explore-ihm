import moment from "moment";
export const FacilitiesDTO = {
    create: (data: any) => {
        return {
            title: data?.title || "",
            slug: data?.title.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            description: data?.description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
            keyword:data?.keyword || ''
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            title: data?.title || "",
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",
            description: data?.description || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
            keyword:data?.keyword || ''
        }
    },
}