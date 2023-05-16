import moment from "moment";
export const FeaturesDTO = {
    create: (data: any) => {
        return {
            feature_name: data?.feature_name || "",
            slug: data?.feature_name.toLowerCase().split(' ').join('-') || '',
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
            feature_name: data?.feature_name || "",
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",
            description: data?.description || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
            keyword:data?.keyword || ''
        }
    },
}