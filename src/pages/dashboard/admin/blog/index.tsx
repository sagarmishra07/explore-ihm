import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CommonHead from "@/components/common/CommonHead";
import {ActionIcon, Button, Modal, Table, TextInput} from "@mantine/core";
import CommonDivider from "@/components/common/CommonDivider";
import showNotify from "@/utils/notify";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import {firebaseGet, firebaseRemove, firebaseUpdate} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {IconEdit, IconTrash} from "@tabler/icons";
import Image from "next/image";
import {BlogDTO} from "@/utils/formatters/BlogDTO";
import {Controller, useForm} from "react-hook-form";
import FormTitle from "@/components/common/FormTitle";
import ImageUpload from "@/components/common/ImageUpload";
import dynamic from "next/dynamic";

const defaultBlog = {
    slug: '',
    blog_title: "",
    blog_description: "",
    imageUrl: "",
    keyword: "",
    createdAt: "",
    key: ""
}

const RichTextEditor = dynamic(import('@mantine/rte'), {
    ssr: false,
    loading: () => null,
});
const firebaseUrl = 'landing/Blogs'

function BlogDetail() {
    const router = useRouter();
    const [rows, setRows] = useState<any>([]);
    const [isEdit, setIsEdit] = useState<any>(false)
    const [loading, setLoading] = useState<boolean>(false);

    const handleLoading = (condition: any) => {
        setLoading(condition)
    }


    const getAllBlogs = async () => {
        setLoading(true);
        const res: any = await firebaseGet(firebaseUrl);
        const formatted: any = FirebaseDTO.receive(res);
        const afterFormat = formatted.map((val: any, index: any) => BlogDTO.receive(val, index));
        setRows(afterFormat)
        setLoading(false)
    }

    const deleteBlog = async (key: any) => {
        setLoading(true)
        await firebaseRemove(firebaseUrl, key);
        showNotify('success', "Blog Deleted");
        setLoading(false)
        await getAllBlogs()

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

            blogs: {
                ...defaultBlog
            }

        },
        mode: 'onChange',
    });


    useEffect(() => {
        let unsubscribe: any;

        if (router.isReady) {
            unsubscribe = getAllBlogs().then(r => r);
        }
        return () => {
            unsubscribe = []

        };
    }, [router.isReady])

    const onSubmit = async (values: any) => {
        try {
            setLoading(true);
            const formatted: any = BlogDTO.create(values.blogs);
            await firebaseUpdate(firebaseUrl, values?.blogs?.key, formatted);
            showNotify('success', "Updated Successfully")
            reset();

            setIsEdit(false);
            setLoading(false)
            await getAllBlogs();

        } catch (e: any) {
            showNotify("error", e)
        }
    }


    const items = rows.map((data: any, index: any) => (
        <tr
            key={index}

        >
            <td>{data?.sNo}</td>
            <td className={""}>{data?.blog_title}</td>
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
            <td dangerouslySetInnerHTML={{__html: data?.blog_description}}></td>
            <td>{data?.createdAt}</td>
            <td>
                <div className={"flex gap-4"}>
                    <ActionIcon
                        color="blue"

                    >
                        <IconEdit size={30} onClick={() => {
                            setValue('blogs', data);
                            setIsEdit(true)
                        }}/>
                    </ActionIcon>
                    <ActionIcon
                        color="primary"
                        onClick={() => deleteBlog(data?.key)}
                    >
                        <IconTrash size={30}/>
                    </ActionIcon>
                </div>
            </td>
        </tr>
    ));
    return (
        <>
            <CommonHead title={"Explore IMH | BLOG"}/>

            {!loading ? (

                    <main className={"grid"}>
                        <section className={"flex justify-end"}>
                            <div>
                                <Button
                                    size={"md"}
                                    className={"my-1"}
                                    onClick={() => router.push("/dashboard/admin/blog/add")}
                                >
                                    Add Blog
                                </Button>
                            </div>
                        </section>
                        <CommonDivider/>

                        <Table>
                            <thead>
                            <tr>
                                <th>S.N</th>
                                <th> Title</th>
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

                                            <FormTitle isRequired={true} title={'Title'}/>
                                            <div>
                                                <Controller
                                                    name={'blogs.blog_title'}
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
                                                            error={errors.blogs?.blog_title?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={'col-span-12 md:col-span-6'}>

                                            <FormTitle isRequired={true} title={'Keyword'}/>
                                            <div>
                                                <Controller
                                                    name={'blogs.keyword'}
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
                                                            error={errors.blogs?.keyword?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>


                                        <div className={'col-span-12 md:col-span-12 '}>
                                            <FormTitle isRequired={true} title={'Description'}/>
                                            <div>
                                                <Controller
                                                    name={'blogs.blog_description'}
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

                                                <div
                                                    className={'text-primary'}> {errors.blogs?.blog_description?.message}</div>
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
                                                value={'blogs.imageUrl'}
                                                url={'Blog'}
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
