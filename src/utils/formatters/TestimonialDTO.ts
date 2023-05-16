import moment from "moment";
export const TestimonialDTO = {
    create: (data: any) => {
        return {
            student_name: data?.student_name || "",
            slug: data?.student_name.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            rating: data?.rating || "",
            description:data?.description || "",
            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
            keyword:data?.keyword || ''
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            student_name: data?.student_name || "",
            slug: data?.slug || "",
            key:data?.key || "",
            imageUrl: data?.imageUrl || "",
            description:data?.description || "",

            rating: data?.rating || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
            keyword:data?.keyword || ''
        }
    },
}