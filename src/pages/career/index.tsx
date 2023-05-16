import {Divider} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import {firebaseGet} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loading from "@/components/common/Loading";
import Welcome2 from "../../assets/images/welcome2.svg";

const Career = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [serviceItem, setServiceItem] = useState([]);
    const [serviceDescription, setServiceDescription] = useState<any>({});
    const getAllFacilities = async () => {
        setLoading(true);
        const res: any = await firebaseGet("Career");

        const formatted: any = FirebaseDTO.receive(res?.data);
        setServiceItem(formatted);
        setServiceDescription(res?.details);
        setLoading(false);
    };
    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllFacilities().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);
    return (
        <>
            {!loading ? (
                <main className="dynamic-x-padding dyanamic-y-padding">
                    <div
                        className="absolute right-0 bg-gray-200 bg-opacity-60 invisible md:visible"
                        style={{
                            height: "80%",
                            width: "30%",
                            zIndex: "-999",
                        }}
                    >
                        <Divider
                            size={"xl"}
                            className="w-60 absolute bottom-0  right-0"
                            color={"#C00000"}
                        />
                    </div>
                    {/* TODO: use nav bread crumbs */}

                    {/* contents for Career page */}
                    <section className="py-10 z-10 ">
                        {/* first section */}
                        <div className="md:mb-36 ">
                            <p className="font-bold text-lg text-primary">EXPLORE IHM</p>
                            <div className="md:grid grid-cols-2 gap-8">
                                <div>
                                    <div className="py-5">
                                        <p className="font-bold text-3xl">DEVELOPING YOUR </p>
                                        <p className="font-bold text-3xl">CAREER </p>
                                    </div>
                                    <div className="">
                                        <Divider size={"xl"} className="w-24" color={"#C00000"}/>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p
                                            className="py-5"
                                            dangerouslySetInnerHTML={{
                                                __html: serviceDescription?.description,
                                            }}
                                        ></p>
                                    </div>
                                </div>
                                <div className="h-96">
                                    <img
                                        className="rounded-lg h-80 w-full object-cover"
                                        src={Welcome2.src}
                                        alt="title"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* second section */}

                        {serviceItem?.map((val: any, idx: any) => (
                            <section
                                className="dynamic-x-padding dynamic-y-padding"
                                key={idx}
                            >
                                <div className="md:grid grid-cols-12">
                                    <div className="col-span-5">
                                        <img
                                            src={val?.imageUrl}
                                            alt="img-here"
                                            className="rounded-lg h-full w-full object-cover"
                                        />
                                    </div>
                                    <div
                                        className="col-span-7 flex px-5 md:px-16 py-6 lg:relative lg:right-10 bg-gray-200 bg-opacity-80">
                                        <div>
                                            <p className="font-bold text-primary text-lg">
                                                {val?.header}
                                            </p>
                                            <p className="font-bold">{val?.title}</p>
                                            <p
                                                className="text-md"
                                                dangerouslySetInnerHTML={{__html: val?.description}}
                                            ></p>
                                            <Divider
                                                size={"xl"}
                                                className="w-full mt-4"
                                                color={"#C00000"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
Career.Layout = MainLayout;
export default Career;
