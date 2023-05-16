import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
export const GalleryDTO = {

    receive: (data: any) => {
        console.log("sdaasd",data)
        return {
            album_title: data?.album_title || "",
            key:data?.key || "",
            gallery: FirebaseDTO.receive(data?.gallery) || [],
            size:data?.gallery?.length || 0,

        }
    },
}