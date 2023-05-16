import moment from "moment";
export const TeamDTO = {
    create: (data: any) => {
        return {
            member_name: data?.member_name || "",
            slug: data?.member_name.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            position: data?.position || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            member_name: data?.member_name || "",
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",
            position: data?.position || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
        }
    },
}