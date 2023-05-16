import moment from "moment";

export const CoursesDTO = {
    create: (data: any) => {
        return {
            course_name: data?.course_name || "",
            slug: data?.course_name.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            description: data?.description || "",
            createdAt: data?.createdAt || Date() || '',
            updatedAt: Date(),
            pdfUrl: data?.pdfUrl || "",

            category: data?.category || "",
            keyword: data?.keyword || '',
            listed_in: data?.listed_in || "",
        }
    },

    receive: (data: any, index: any) => {
        return {
            sNo: index + 1,
            course_name: data?.course_name || "",
            slug: data?.slug || "",
            key: data?.key || "",
            category: data?.category || "",

            imageUrl: data?.imageUrl || "",
            description: data?.description || "",
            createdAt: moment(data?.createdAt).format("MMMM DD,YYYY") || '',
            keyword: data?.keyword || '',
            listed_in: data?.listed_in || "",
            pdfUrl: data?.pdfUrl || "",


        }
    },
}