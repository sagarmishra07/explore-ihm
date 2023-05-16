import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CommonHead from "@/components/common/CommonHead";
import {ActionIcon, Button, Modal, Table, TextInput} from "@mantine/core";
import CommonDivider from "@/components/common/CommonDivider";
import showNotify from "@/utils/notify";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import {firebaseGet, firebaseRemove, firebaseUpdate} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {IconEdit, IconEye, IconTrash} from "@tabler/icons";
import Image from "next/image";
import {Controller, useForm} from "react-hook-form";
import FormTitle from "@/components/common/FormTitle";
import ImageUpload from "@/components/common/ImageUpload";
import dynamic from "next/dynamic";
import {CoursesDTO} from "@/utils/formatters/CoursesDTO";

const defaultBlog = {
    slug: '',
    course_name: "",
    description: "",
    imageUrl: "",
    pdfUrl: "",
    keyword: "",
    createdAt: "",
    key: ""
}

const RichTextEditor = dynamic(import('@mantine/rte'), {
    ssr: false,
    loading: () => null,
});

function BlogDetail() {
    const router = useRouter();
    const [rows, setRows] = useState<any>([]);
    const [isEdit, setIsEdit] = useState<any>(false)
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoading = (condition: any) => {
        setLoading(condition)
    }


    const getAllData = async () => {
        setLoading(true);
        const res: any = await firebaseGet("Courses");
        const formatted: any = FirebaseDTO.receive(res);
        const afterFormat = formatted.map((val: any, index: any) => CoursesDTO.receive(val, index));
        setRows(afterFormat)
        setLoading(false)
    }

    const deleteData = async (key: any) => {
        setLoading(true)
        await firebaseRemove('Courses', key);
        showNotify('success', "Course Deleted");
        setLoading(false)
        await getAllData()

    }

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {

            data: {
                ...defaultBlog
            }

        },
        mode: 'onChange',
    });


    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllData().then(r => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady])

    const onSubmit = async (values: any) => {
        try {
            setLoading(true);
            const formatted: any = CoursesDTO.create(values.data);
            await firebaseUpdate('Courses', values?.data?.key, formatted);
            showNotify('success', "Updated Successfully")
            reset();

            setIsEdit(false);
            setLoading(false)
            await getAllData();

        } catch (e: any) {
            showNotify("error", e)
        }
    }


    const items = rows.map((data: any, index: any) => (
        <tr
            key={index}

        >
            <td>{data?.sNo}</td>
            <td className={""}>{data?.course_name}</td>
            <td className={"flex gap-6 items-center"}>
                <div>
                    <Image
                        src={data?.imageUrl}
                        alt={"No Image"}
                        height={'100'} width={'100'}

                    />
                </div>

            </td>
            <td>
                {data?.keyword}
            </td>
            <td dangerouslySetInnerHTML={{__html: data?.description}}></td>
            <td>{data?.createdAt}</td>
            <td>
                <div className={"flex gap-4"}>
                    <ActionIcon
                        color="dark"

                    >
                        <IconEye size={30} onClick={() => router.push(`/dashboard/admin/courses/${data?.slug}`)}/>
                    </ActionIcon>
                    <ActionIcon
                        color="blue"

                    >
                        <IconEdit size={30} onClick={() => {
                            setValue('data', data);
                            setIsEdit(true)
                        }}/>
                    </ActionIcon>
                    <ActionIcon

                        color="primary"
                        onClick={() => deleteData(data?.key)}
                    >
                        <IconTrash size={30}/>
                    </ActionIcon>
                </div>
            </td>
        </tr>
    ));
    return (
        <>
            <CommonHead title={"Explore IMH | Course"}/>

            {!loading ? (

                    <main className={"grid"}>
                        <section className={"flex justify-end"}>
                            <div>
                                <Button
                                    size={"md"}
                                    className={"my-1"}
                                    onClick={() => router.push("/dashboard/admin/courses/add")}
                                >
                                    Add Courses
                                </Button>
                            </div>
                        </section>
                        <CommonDivider/>

                        <Table>
                            <thead>
                            <tr>
                                <th>S.N</th>
                                <th> Course Name</th>
                                <th> Image</th>
                                <th>Keyword</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </Table>


                        <Modal
                            opened={isEdit}
                            centered
                            size={'xl'}
                            onClose={() => setIsEdit(false)}
                            title="Edit Blog"
                        >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <section className={'grid grid-cols-12 gap-4 sm:gap-10'}>
                                    <article className={'col-span-6 grid gap-4'}>

                                        <div className={'col-span-12 md:col-span-6'}>

                                            <FormTitle isRequired={true} title={'Course Name'}/>
                                            <div>
                                                <Controller
                                                    name={'data.course_name'}
                                                    control={control}
                                                    rules={{
                                                        required: 'Required',
                                                    }}
                                                    // defaultValue={'4567'}
                                                    render={({field}) => (
                                                        <TextInput
                                                            {...field}
                                                            type={'text'}
                                                            // variant={'filled'}
                                                            size={'lg'}
                                                            placeholder="Title"
                                                            error={errors.data?.course_name?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={'col-span-12 md:col-span-6'}>

                                            <FormTitle isRequired={true} title={'Keyword'}/>
                                            <div>
                                                <Controller
                                                    name={'data.keyword'}
                                                    control={control}
                                                    rules={{
                                                        required: 'Required',
                                                    }}
                                                    // defaultValue={'4567'}
                                                    render={({field}) => (
                                                        <TextInput
                                                            {...field}
                                                            type={'text'}
                                                            // variant={'filled'}
                                                            size={'lg'}
                                                            placeholder="Meta Keyword"
                                                            error={errors.data?.keyword?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={'col-span-12 md:col-span-12'}>

                                            <FormTitle isRequired={false} title={'Pdf'}/>
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

                                        <div className={'col-span-12 md:col-span-12 '}>
                                            <FormTitle isRequired={true} title={'Description'}/>
                                            <div>
                                                <Controller
                                                    name={'data.description'}
                                                    control={control}
                                                    rules={{
                                                        required: 'Required',
                                                    }}
                                                    render={({field: {value, onChange}}) => (
                                                        <RichTextEditor
                                                            value={value}
                                                            onChange={onChange}
                                                        ></RichTextEditor>
                                                    )}
                                                />

                                                <div className={'text-primary'}> {errors.data?.description?.message}</div>
                                            </div>
                                        </div>

                                    </article>
                                    <article className={'col-span-6 grid justify-between'}>


                                        <div className={'col-span-12 md:col-span-6 pb-2'}>
                                            <FormTitle isRequired={true} title={'Upload Image '}/>

                                            <ImageUpload
                                                control={control}
                                                setValue={setValue}
                                                getValues={getValues}
                                                errors={errors}
                                                value={'data.imageUrl'}
                                                url={'Courses'}
                                                handleLoading={handleLoading}

                                            />


                                        </div>

                                    </article>

                                    <article
                                        className={
                                            'col-span-12    '
                                        }
                                    >
                                        <div className={'flex justify-end gap-3'}>
                                            <Button size={'lg'} color={'red'} variant={'outline'}
                                                    onClick={() => setIsEdit(false)}>
                                                Cancel
                                            </Button>
                                            <Button size={'lg'} type={'submit'} disabled={loading}>
                                                Update
                                            </Button>
                                        </div>
                                    </article>
                                </section>
                            </form>
                        </Modal>

                    </main>
                )
                : (
                    <div className={'flex justify-center dynamic-y-padding'}>Loading...</div>

                )
            }

        </>
    );
}

BlogDetail.Layout = AdminDashboardLayout;

export default BlogDetail;
