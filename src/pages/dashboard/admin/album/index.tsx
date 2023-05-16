import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CommonHead from "@/components/common/CommonHead";
import {ActionIcon, Button, Modal, Table, TextInput} from "@mantine/core";
import CommonDivider from "@/components/common/CommonDivider";
import showNotify from "@/utils/notify";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import {firebaseGet, firebasePush, firebaseRemove, firebaseStore, firebaseUpdate} from "@/api/firebase";
import {FirebaseDTO} from "@/utils/formatters/FirebaseDTO";
import {IconEdit, IconEye, IconTrash} from "@tabler/icons";
import Image from "next/image";
import {Controller, useForm} from "react-hook-form";
import FormTitle from "@/components/common/FormTitle";
import {GalleryDTO} from "@/utils/formatters/GalleryDTO";
import ImageUpload from "@/components/common/ImageUpload";

const defaultData = {

    album_title: '',
    key: "",
    gallery: []
}

const firebaseUrl = 'landing/Album'

function Testimonial() {
    const router = useRouter();
    const [rows, setRows] = useState<any>([]);
    const [isEdit, setIsEdit] = useState<any>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [galleryImage, setGalleryImage] = useState<any>([]);
    const [openGallery, setOpenGallery] = useState<boolean>(false);
    const [addImagePrompt, setAddImagePrompt] = useState<boolean>(false);

    const handleLoading = (condition: any) => {
        setLoading(condition)
    }


    const getAllData = async () => {
        setLoading(true);

        const res: any = await firebaseGet(firebaseUrl);
        const formatted: any = FirebaseDTO.receive(res);
        const afterFormat = formatted.map((val: any) => GalleryDTO.receive(val));
        setRows(afterFormat)
        setLoading(false)
    }


    const deleteData = async (key: any) => {
        setLoading(true)
        await firebaseRemove(firebaseUrl, key);
        showNotify('success', "Deleted Successfully");
        setLoading(false)
        await getAllData()

    }


    const getAllImages = async (albumKey: any) => {
        setLoading(true);
        const res = await firebaseGet(`${firebaseUrl}/${albumKey}/gallery`);
        const formatted: any = FirebaseDTO.receive(res);
        setGalleryImage(formatted);
        setOpenGallery(true)
        setLoading(false)
    }


    const addNewImage = async (values: any) => {
        setLoading(true);


        await firebasePush(`${firebaseUrl}/${values?.data?.key}/gallery`, values?.addNewImage);
        showNotify("success", "New Image Added");
        setAddImagePrompt(false);
        setLoading(false);

        await getAllImages(values?.data?.key);
        reset();
    }
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        getValues,
        formState: {errors},
    } = useForm({
        defaultValues: {

            data: {
                ...defaultData
            },
            addNewImage: {
                imageUrl: ""
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


    const deleteImageFromAlbum = async (galleryKey: any) => {
        try {
            setLoading(true);
            const res = getValues();
            await firebaseRemove(`${firebaseUrl}/${res?.data?.key}/gallery`, galleryKey)
            showNotify('success', "Deleted Successfully")
            await getAllImages(res?.data.key)
            setLoading(false)
        } catch (e: any) {
            showNotify("error", e?.message)
        }
    }
    const onSubmit = async (values: any) => {
        try {
            setLoading(true);
            await firebaseUpdate(firebaseUrl, values?.data?.key, {album_title: values?.data?.album_title});

            for (let data of values?.data?.gallery) {
                await firebaseStore(`${firebaseUrl}/${values?.data?.key}/gallery/${data?.key}`, data)
            }

            showNotify('success', "Updated Successfully")

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
            <td className={""}>{data?.album_title}</td>


            <td>
                <div className={"flex gap-4"}>
                    <ActionIcon
                        color="dark"

                    >
                        <IconEye size={30} onClick={() => {
                            getAllImages(data?.key).then(r => r)
                            setValue('data', data)

                        }}/>
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
            <CommonHead title={"Explore IMH | Teams"}/>


            <main className={"grid"}>
                <section className={"flex justify-end"}>
                    <div>
                        <Button
                            size={"md"}
                            className={"my-1"}
                            onClick={() => router.push("/dashboard/admin/album/add")}
                        >
                            Add Album
                        </Button>
                    </div>
                </section>
                <CommonDivider/>

                <Table>
                    <thead>
                    <tr>
                        <th>S.N</th>
                        <th> Album Title</th>

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
                    title="Edit Album"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <section className={'grid grid-cols-12 gap-4 sm:gap-10'}>
                            <article className={'col-span-12 grid gap-4'}>

                                <div className={'col-span-12 md:col-span-12'}>

                                    <FormTitle isRequired={true} title={'Album Title'}/>
                                    <div>
                                        <Controller
                                            name={'data.album_title'}
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
                                                    placeholder="Album title"
                                                    error={errors.data?.album_title?.message}
                                                />
                                            )}
                                        />
                                    </div>
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


                <Modal
                    opened={openGallery}
                    centered
                    size={'xl'}
                    onClose={() => setOpenGallery(false)}
                    title="Gallery Images"
                >
                    <main className={'grid gap-4'}>
                        <section className={'flex justify-end'}>
                            <Button onClick={() => setAddImagePrompt(true)}>Add Image</Button>
                        </section>
                        {addImagePrompt && (
                            <section>

                                <form onSubmit={handleSubmit(addNewImage)}>
                                    <section className={'grid grid-cols-12 gap-4 sm:gap-10'}>
                                        <article className={'col-span-12 grid gap-4'}>


                                            <div className={'col-span-12 md:col-span-12'}>
                                                <FormTitle isRequired={true} title={'Gallery Image'}/>
                                                <div className={'col-span-12'}>
                                                    <ImageUpload
                                                        control={control}
                                                        setValue={setValue}
                                                        getValues={getValues}
                                                        errors={errors}
                                                        value={`addNewImage.imageUrl`}
                                                        url={'Album'}
                                                        handleLoading={handleLoading}
                                                    />
                                                </div>

                                            </div>


                                        </article>


                                        <article
                                            className={
                                                'col-span-12    '
                                            }
                                        >
                                            <div className={'flex justify-end gap-3'}>
                                                <Button size={'lg'} color={'red'} variant={'outline'}
                                                        onClick={() => setAddImagePrompt(false)}>
                                                    Cancel
                                                </Button>
                                                <Button size={'lg'} type={'submit'} disabled={loading}>
                                                    Add
                                                </Button>
                                            </div>
                                        </article>
                                    </section>
                                </form>
                            </section>
                        )


                        }

                        <section className={'grid grid-cols-3 gap-8'}>


                            {galleryImage?.length > 0 ? (
                                <>
                                    {galleryImage?.map((v: any, idx: number) => (

                                            <div key={idx}>
                                                <div><ActionIcon
                                                    color="primary"
                                                    onClick={() => deleteImageFromAlbum(v?.key)}
                                                >
                                                    <IconTrash size={30}/>
                                                </ActionIcon></div>


                                                <Image src={v?.imageUrl} alt={'test'} height={50} width={500}/>


                                            </div>
                                        )
                                    )}
                                </>

                            ) : (
                                <> Empty Album </>
                            )}


                        </section>
                    </main>

                </Modal>

            </main>


        </>
    );
}

Testimonial.Layout = AdminDashboardLayout;

export default Testimonial;
