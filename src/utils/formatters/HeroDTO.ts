import moment from "moment";
export const HeroDTO = {
    create: (data: any) => {
        return {
            title: data?.title || "",
            slug: data?.title.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            subtitle: data?.subtitle || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            title: data?.title || "",
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",
            subtitle: data?.subtitle || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}