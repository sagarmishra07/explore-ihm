import moment from "moment";
export const EventsDTO = {
    create: (data: any) => {
        return {
            event_title: data?.event_title || "",
            slug: data?.event_title.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            keyword:data?.keyword || "",
            imageUrl: data?.imageUrl || "",
            start_date: moment(data?.start_date).format("MMMM DD, YYYY") || '',

            location:data?.location || "",
            description:data?.description || "",
            end_date: moment(data?.end_date).format("MMMM DD, YYYY") || '',

            createdAt: data?.createdAt ||  Date() || '',
            updatedAt:Date(),
        }
    },

    receive: (data: any,index:any) => {
        return {
            sNo:index+1,
            event_title: data?.event_title || "",
            slug: data?.event_title.toLowerCase().split(' ').join('-') || '',
            key: data?.key || "",
            imageUrl: data?.imageUrl || "",
            start_date: data?.start_date || "",
            description:data?.description || "",
            keyword:data?.keyword || "",
            location:data?.location || "",

            end_date: data?.end_date || "",
            createdAt: moment(data?.createdAt).format("MMMM DD, YYYY") || '',
        }
    },
}