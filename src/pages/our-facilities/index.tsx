import {useEffect, useState} from "react";
import {Divider, Group} from "@mantine/core";
import MainLayout from "@/layouts/MainLayout";
import {firebaseGet} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {useRouter} from "next/router";
import Loading from "@/components/common/Loading";

const OurFacilities = () => {
    const router = useRouter();
    const [serviceItem, setServiceItem] = useState([]);
    const [loading, setLoading] = useState(false);

    const [serviceDescription, setServiceDescription] = useState<any>({});
    const getAllFacilities = async () => {
        setLoading(true);
        const res: any = await firebaseGet("Facilities");

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
                <main className="dynamic-x-padding my-16 grid gap-y-4">
                    <section className="">
                        <Group>
                            <section>
                                <article className="text-primary uppercase gap-3 font-bold text-lg">
                                    Explore IHM
                                </article>
                                <article className="py-3">
                                    <div className="w-[14rem] font-extrabold text-4xl uppercase">
                                        Our Facilities
                                    </div>
                                </article>
                            </section>

                            <Divider orientation="vertical" size={"xl"} color="red"/>
                            <article className="w-[18rem]">
                <span>
                Explore Institute of Hotel Management provides various facilities to its 
                students to enhance their learning experience.
                </span>
                            </article>
                        </Group>
                    </section>
                    {serviceItem?.map((val: any, idx: number) => (
                        <article key={idx} className={"md:grid grid-cols-12 gap-4 pt-8 "}>
                            {idx % 2 === 0 ? (
                                <>
                                    <div className="col-span-5 h-80 w-full">
                                        <img
                                            src={val?.imageUrl}
                                            alt={val?.title}
                                            className="rounded-lg  object-cover"
                                        />
                                    </div>
                                    <div className="col-span-7 grid place-content-center py-6">
                                        <div className="flex text-primary font-extrabold text-3xl capitalize text-left">
                                            {val?.title}
                                        </div>
                                        <div
                                            className="py-3 text-md font-normal"
                                            dangerouslySetInnerHTML={{
                                                __html: val?.description,
                                            }}
                                        ></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col-span-7 grid place-content-center">
                                        <div
                                            className="flex text-primary font-extrabold text-3xl capitalize  text-left">
                                            {val?.title}
                                        </div>
                                        <div
                                            className="py-3 text-md font-normal text-left"
                                            dangerouslySetInnerHTML={{
                                                __html: val?.description,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="col-span-5 h-80 w-full  ">
                                        <img
                                            src={val?.imageUrl}
                                            alt={val?.title}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                </>
                            )}
                        </article>
                    ))}

                    <section>
                        <div
                            className=" dynamic-y-padding px-6 text-md font-normal  text-left"
                            dangerouslySetInnerHTML={{
                                __html: serviceDescription?.description,
                            }}
                        ></div>
                    </section>
                </main>
            ) : (
                <Loading/>
            )}
        </>
    );
};
OurFacilities.Layout = MainLayout;
export default OurFacilities;
