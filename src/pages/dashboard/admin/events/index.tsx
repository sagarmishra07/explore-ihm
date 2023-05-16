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
import {Controller, useForm} from "react-hook-form";
import FormTitle from "@/components/common/FormTitle";
import ImageUpload from "@/components/common/ImageUpload";
import dynamic from "next/dynamic";
import {EventsDTO} from "@/utils/formatters/EventsDTO";
import {DatePicker} from "@mantine/dates";
import {CalendarEvent} from "tabler-icons-react";

const defaultBlog = {
    slug: '',
    event_title: "",
    description: "",
    imageUrl: "",
    location: "",
    keyword: "",
    start_date: "",
    end_date: "",
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
        const res: any = await firebaseGet("Events");
        const formatted: any = FirebaseDTO.receive(res);
        const afterFormat = formatted.map((val: any, index: any) => EventsDTO.receive(val, index));
        setRows(afterFormat)
        setLoading(false)
    }

    const deleteData = async (key: any) => {
        setLoading(true)
        await firebaseRemove('Events', key);
        showNotify('success', "Deleted Successfully");
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
            const formatted: any = EventsDTO.create(values.data);
            await firebaseUpdate('Events', values?.data?.key, formatted);
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
            <td className={""}>{data?.event_title}</td>
            <td className={"flex gap-6 items-center"}>
                <div>
                    <Image
                        src={data?.imageUrl}
                        alt={"No Image"}
                        height={'100'} width={'100'}

                    />
                </div>

            </td>

            <td dangerouslySetInnerHTML={{__html: data?.description}}></td>
            <td>{data?.start_date} - {data?.end_date}</td>
            <td>{data?.location}</td>
            <td>
                <div className={"flex gap-4"}>
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
            <CommonHead title={"Explore IMH | Events"}/>

            {!loading ? (

                    <main className={"grid"}>
                        <section className={"flex justify-end"}>
                            <div>
                                <Button
                                    size={"md"}
                                    className={"my-1"}
                                    onClick={() => router.push("/dashboard/admin/events/add")}
                                >
                                    Add Events
                                </Button>
                            </div>
                        </section>
                        <CommonDivider/>

                        <Table>
                            <thead>
                            <tr>
                                <th>S.N</th>
                                <th> Event Title</th>
                                <th> Image</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Location</th>
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

                                            <FormTitle isRequired={true} title={'Event Title'}/>
                                            <div>
                                                <Controller
                                                    name={'data.event_title'}
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
                                                            placeholder="Event Title"
                                                            error={errors.data?.event_title?.message}
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
                                                            placeholder="Keyword"
                                                            error={errors.data?.keyword?.message}
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
                                        <div className={'col-span-12 md:col-span-12'}>

                                            <FormTitle isRequired={true} title={'Location'}/>
                                            <div>
                                                <Controller
                                                    name={'data.location'}
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
                                                            placeholder="Location"
                                                            error={errors.data?.location?.message}
                                                        />
                                                    )}
                                                />
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
                                                url={'Events'}
                                                handleLoading={handleLoading}

                                            />


                                        </div>
                                        <div className={"col-span-12 md:col-span-6"}>
                                            <FormTitle
                                                isRequired={true}

                                                title={"Start From"}
                                            />
                                            <div>
                                                <Controller
                                                    name={"data.start_date"}
                                                    control={control}
                                                    rules={{
                                                        required: "Required",
                                                    }}
                                                    render={({field}: any) => (
                                                        <DatePicker
                                                            {...field}
                                                            icon={
                                                                <CalendarEvent
                                                                    size={36}
                                                                    strokeWidth={2}
                                                                    color={"black"}
                                                                />
                                                            }
                                                            placeholder="Select Start Date"
                                                            size="lg"
                                                            withAsterisk
                                                            error={errors.data?.start_date?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={"col-span-12 md:col-span-6"}>
                                            <FormTitle
                                                isRequired={true}

                                                title={"End Date"}
                                            />
                                            <div>
                                                <Controller
                                                    name={"data.end_date"}
                                                    control={control}
                                                    rules={{
                                                        required: "Required",
                                                    }}
                                                    render={({field}: any) => (
                                                        <DatePicker
                                                            {...field}
                                                            icon={
                                                                <CalendarEvent
                                                                    size={36}
                                                                    strokeWidth={2}
                                                                    color={"black"}
                                                                />
                                                            }
                                                            placeholder="Select End Date"
                                                            size="lg"
                                                            withAsterisk
                                                            error={errors.data?.end_date?.message}
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
