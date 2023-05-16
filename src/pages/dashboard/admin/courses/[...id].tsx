import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import {useRouter} from "next/router";
import {CoursesDTO} from "@/utils/formatters/CoursesDTO";
import {firebaseGetDataByQuery, firebasePush, firebaseRemove, firebaseUpdate,} from "@/api/firebase";
import showNotify from "@/utils/notify";
import CommonHead from "@/components/common/CommonHead";
import CommonDivider from "@/components/common/CommonDivider";
import FormTitle from "@/components/common/FormTitle";
import {ActionIcon, Button, Select, Table, TextInput} from "@mantine/core";
import ImageUpload from "@/components/common/ImageUpload";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import Image from "next/image";
import {IconEdit, IconTrash} from "@tabler/icons";

const categoryOption = [
    {
        label: "POPULAR",
        value: "POPULAR",
    },
    {
        label: "NORMAL",
        value: "NORMAL",
    },
];

const defaultCourse: any = {
    slug: "",
    course_name: "",
    description: "",
    category: "",
    listed_in: "",
    imageUrl: "",
    keyword: "",
    createdAt: "",
    pdfUrl: "",
    key: "",
};

const RichTextEditor = dynamic(import("@mantine/rte"), {
    ssr: false,
    loading: () => null,
});
const CourseView = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isChanging, setIsChanging] = useState<any>("");
    const [rows, setRows] = useState<any>([]);
    const handleLoading = (condition: any) => {
        setLoading(condition);
    };

    const router = useRouter();
    const id: any = router.query?.id;

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: {errors},
    }: any = useForm({
        defaultValues: {
            data: {
                ...defaultCourse,
            },
        },
        mode: "onChange",
    });

    const updateEditStatus = (data: any) => {

        setIsChanging("EDIT");
        window.scrollTo({top: 0, behavior: 'smooth'});
        setValue("data", data);
    };

    const getAllData = async () => {
        if (id) {
            setLoading(true);
            const res: any = await firebaseGetDataByQuery(
                "/ExtraCourses",
                "category",
                id[0]
            );
            const formatted: any = FirebaseDTO.receive(res);
            const afterFormat = formatted.map((val: any, index: any) =>
                CoursesDTO.receive(val, index)
            );
            setRows(afterFormat);
            setLoading(false);
        }
    };

    const deleteData = async (key: any) => {
        await firebaseRemove(`/ExtraCourses`, key);
        showNotify("success", "Deleted Successfully");
        await getAllData();
    };

    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllData().then((r) => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady]);
    const onSubmit = async (values: any) => {
        try {
            setLoading(true);
            if (isChanging === "ADD") {
                const formatted: any = CoursesDTO.create({
                    ...values?.data,
                    category: id[0],
                });

                await firebasePush(`ExtraCourses`, formatted);
                showNotify("success", "Course Added");
            } else {
                const formatted: any = CoursesDTO.create(values?.data);

                await firebaseUpdate(`ExtraCourses`, values?.data?.key, formatted);
                showNotify("success", "Course Updated");
            }

            setLoading(false);
            reset();
            setIsChanging("");
            await getAllData();
        } catch (e: any) {
            showNotify("error", e?.message);
            setLoading(false);
        }
    };

    const items = rows.map((data: any, index: any) => (
        <tr key={index}>
            <td>{data?.sNo}</td>
            <td className={""}>{data?.course_name}</td>
            <td className={"flex gap-6 items-center"}>
                <div>
                    <Image
                        src={data?.imageUrl}
                        alt={"No Image"}
                        height={"100"}
                        width={"100"}
                    />
                </div>
            </td>
            <td>{data?.keyword}</td>
            <td dangerouslySetInnerHTML={{__html: data?.description}}></td>
            <td>{data?.createdAt}</td>
            <td>
                <div className={"flex gap-4"}>
                    <ActionIcon color="blue">
                        <IconEdit
                            size={30}
                            onClick={() => {
                                updateEditStatus(data);
                            }}
                        />
                    </ActionIcon>
                    <ActionIcon color="primary" onClick={() => deleteData(data?.key)}>
                        <IconTrash size={30}/>
                    </ActionIcon>
                </div>
            </td>
        </tr>
    ));
    return (
        <>
            <CommonHead title={"Courses"}/>
            <main className={"dynamic-y-padding"}>
                <section className={"flex justify-end"}>
                    <div>
                        <Button
                            size={"md"}
                            className={"my-1"}
                            onClick={() => setIsChanging("ADD")}
                        >
                            Add Courses
                        </Button>
                    </div>
                </section>
                <div className={"py-3"}>
                    <CommonDivider/>
                </div>

                {isChanging !== "" && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section className={"grid grid-cols-12 gap-4 sm:gap-10"}>
                            <article className={"col-span-6 grid gap-4"}>
                                <div className={"col-span-12 md:col-span-6"}>
                                    <FormTitle isRequired={true} title={"Course Name"}/>
                                    <div>
                                        <Controller
                                            name={"data.course_name"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            // defaultValue={'4567'}
                                            render={({field}: any) => (
                                                <TextInput
                                                    {...field}
                                                    type={"text"}
                                                    // variant={'filled'}
                                                    size={"lg"}
                                                    placeholder="Course Name"
                                                    error={errors.data?.course_name?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={"col-span-12 md:col-span-6"}>
                                    <FormTitle isRequired={true} title={"Keyword"}/>
                                    <div>
                                        <Controller
                                            name={"data.keyword"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            // defaultValue={'4567'}
                                            render={({field}) => (
                                                <TextInput
                                                    {...field}
                                                    type={"text"}
                                                    // variant={'filled'}
                                                    size={"lg"}
                                                    placeholder="Meta Keyword"
                                                    error={errors.data?.keyword?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className={'col-span-12 md:col-span-12'}>

                                    <FormTitle isRequired={false} title={'Course Images'}/>
                                    <div>
                                        <Controller
                                            name={'data.pdfUrl'}
                                            control={control}
                                         
                                            // defaultValue={'4567'}
                                            render={({field}) => (
                                                <ImageUpload
                                                    control={control}
                                                    setValue={setValue}
                                                    getValues={getValues}
                                                    errors={errors}
                                                    value={'data.pdfUrl'}
                                                    url={'Courses'}
                                                    handleLoading={handleLoading}

                                                />

                                            )}
                                        />
                                    </div>
                                </div>

                                <div className={"col-span-12 md:col-span-6 "}>
                                    <FormTitle isRequired={true} title={"Description"}/>
                                    <div>
                                        <Controller
                                            name={"data.description"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            render={({field: {value, onChange}}) => (
                                                <RichTextEditor
                                                    value={value}
                                                    onChange={onChange}
                                                ></RichTextEditor>
                                            )}
                                        />

                                        <div className={"text-primary"}>
                                            {" "}
                                            {errors.data?.description?.message}
                                        </div>
                                    </div>
                                </div>

                                <div className={"col-span-12 md:col-span-6 "}>
                                    <FormTitle isRequired={true} title={"Listed In"}/>
                                    <div>
                                        <Controller
                                            name={"data.listed_in"}
                                            control={control}
                                            rules={{
                                                required: "Required",
                                            }}
                                            render={({field}) => (
                                                <Select
                                                    {...field}
                                                    nothingFound="No Routes Available"
                                                    searchable
                                                    placeholder="Listed In"
                                                    error={errors?.listed_in?.message}
                                                    size="lg"
                                                    data={categoryOption}
                                                />
                                            )}
                                        />

                                        <div className={"text-primary"}>
                                            {" "}
                                            {errors.data?.listed_in?.message}
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article className={"col-span-6 grid justify-between"}>
                                <div className={"col-span-12 md:col-span-6 pb-2"}>
                                    <FormTitle isRequired={true} title={"Upload Image "}/>

                                    <ImageUpload
                                        control={control}
                                        setValue={setValue}
                                        getValues={getValues}
                                        errors={errors}
                                        value={"data.imageUrl"}
                                        url={"Courses"}
                                        handleLoading={handleLoading}
                                    />
                                </div>
                            </article>

                            <article className={"col-span-12    "}>
                                <div className={"flex justify-end gap-3"}>
                                    <Button
                                        size={"lg"}
                                        color={"red"}
                                        variant={"outline"}
                                        onClick={() => {
                                            setIsChanging("");
                                            reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button size={"lg"} type={"submit"} disabled={loading}>
                                        {isChanging === "EDIT" ? "Update" : "Add"}
                                    </Button>
                                </div>
                            </article>
                        </section>
                    </form>
                )}

                <section className={"dynamic-y-padding"}>
                    <Table>
                        <thead>
                        <tr>
                            <th>S.N</th>
                            <th> Course Name</th>
                            <th> Image</th>
                            <th>Keyword</th>
                            <th>Description</th>
                            <th>Listed In</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>{items}</tbody>
                    </Table>
                </section>
            </main>
        </>
    );
};
CourseView.Layout = AdminDashboardLayout;
export default CourseView;
