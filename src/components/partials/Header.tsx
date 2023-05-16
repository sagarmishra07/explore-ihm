import {firebaseGet} from "@/api/firebase";
import {IconBrandWhatsapp, IconMail, IconPhoneCall} from "@tabler/icons";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter()
    const [details, setDetails] = useState<any>({});
    const getAllDetails = async () => {
        const res: any = await firebaseGet(`landing/Details`);
        setDetails(res);
    };
    useEffect(() => {
        let unsubscribe: any;
        if (router.isReady) {
            unsubscribe = getAllDetails().then((r) => r);
        }
        return () => {
            unsubscribe = [];
        };
    }, [router.isReady]);
    return (
        <section className="bg-primary dynamic-x-padding hidden md:block">
            <div className="w-full md:h-9 text-white p-2 md:flex md:justify-between items-center">
                <div className="flex items-center">
                    <IconMail size={24}/>
                    <span
                        className="text-base font-bold cursor-pointer pl-1  text-left"
                        onClick={() => window.open(`mailto:${details?.email}`)}
                    >
            {details?.email}
          </span>
                </div>
                <article className="flex justify-between gap-4">
                    <div className="flex items-center cursor-pointer">
                        <IconBrandWhatsapp size={24}/>
                        <span
                            onClick={() =>
                                window.open(
                                    `https://api.whatsapp.com/send?phone=${details?.whatsApp}`
                                )
                            }
                            className="text-base font-bold cursor-pointer pl-1 text-left"
                        >
              {details?.whatsApp}
            </span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <IconPhoneCall size={22}/>
                        <span
                            onClick={() =>
                                window.open(
                                    `https://api.whatsapp.com/send?phone=${details?.phone}`
                                )
                            }
                            className="text-base font-bold pl-1 text-left"
                        >
              {details.phone}
            </span>
                    </div>
                </article>
            </div>
        </section>
    );
};
export default Header;
