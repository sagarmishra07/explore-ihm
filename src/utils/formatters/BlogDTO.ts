import moment from "moment";
export const BlogDTO = {
    create: (data: any) => {
        return {
            blog_title: data?.blog_title || "",
            slug: data?.blog_title.replace(/[?\s]/g, '')?.toLowerCase() || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            blog_description: data?.blog_description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
            keyword:data?.keyword || ''
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            blog_title: data?.blog_title || "",
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",
            blog_description: data?.blog_description || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
            keyword:data?.keyword || ''
        }
    },
}