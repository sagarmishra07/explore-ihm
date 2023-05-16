import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Modal, Text, useMantineTheme } from '@mantine/core';
import { IconCloudUpload, IconEye, IconUpload, IconX } from '@tabler/icons';
import { useState } from 'react';

// interface IImageUpload {
//     control: any;
//     value: string;
//     handleLoading: any;
//     // index: any;
// }
import { Controller } from 'react-hook-form';
import Image from 'next/image';
import {firebaseUploadImages} from "@/api/firebase";

const ImageUpload = ({
                         control,
                         setValue,
                         errors,
                         getValues,
                         value,
                         handleLoading,
                         final,
                         index,
                         keys,
    url
                     }: any) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadCoverImg, setUploadCoverImg] = useState('');
    const [invalid, setInvalid] = useState(false);

    // console.log('jka', final, index, keys, !!keys, errors);
    // console.log('error value >>>>.', value, keys, index, errors[value][index]);

    // @ts-ignore
    return (
        <>
            <div>
                <Controller
                    name={value}
                    control={control}
                    rules={{
                        required: 'Required',
                    }}
                    defaultValue={''}
                    render={() => (
                        <Dropzone
                            loading={isLoading}
                            onDrop={(files) => {
                                handleLoading(true);

                                setIsLoading(true);
                                setInvalid(false);
                                firebaseUploadImages(url,files)
                                    .then((res) => {
                                        setIsLoading(false);


                                        return res;

                                    })
                                    .then((res) => {

                                        // if (value !== 'achievements') {
                                        //     con
                                        //     form.values[value] = res.data.Location;
                                        // } else {
                                        // form.values[value].achievementImg = res.data.Location;
                                        // }
                                        if (keys) {
                                            // console.log(
                                            //     'inside',
                                            //     final[index][keys],
                                            //     // getValues(final[index][keys]),
                                            // );
                                            setValue(
                                                `${final}.${index}.${keys}`,
                                                res,
                                            );
                                            // console.log('outside', getValues(final[index][keys]));
                                        } else {
                                            setValue(value, res);
                                        }
                                        setUploadCoverImg(res);
                                        handleLoading(false);
                                    })
                                    .catch(() => {
                                        // TODO: Update ui and states with error....
                                    });
                            }}
                            onReject={() => setInvalid(true)}
                            // maxSize={1 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        >
                            <Group
                                position="center"
                                spacing="xl"
                                style={{ minHeight: 220, pointerEvents: 'none' }}
                            >
                                <Dropzone.Accept>
                                    <IconUpload
                                        size={50}
                                        stroke={1.5}
                                        color={
                                            theme.colors[theme.primaryColor][
                                                theme.colorScheme === 'dark' ? 4 : 6
                                                ]
                                        }
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        size={50}
                                        stroke={1.5}
                                        color={
                                            theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
                                        }
                                    />
                                </Dropzone.Reject>

                                <div className={'flex flex-col justify-center items-center gap-y-3'}>
                                    <Dropzone.Idle>
                                        <IconCloudUpload size={50} stroke={1.5} />
                                    </Dropzone.Idle>

                                    <Text size="sm" color="dimmed" inline mt={7}>
                                        Drag’n drop files here to upload. We can accept only .jpg files
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7}>
                                        that are less than 30mb in size
                                    </Text>

                                </div>
                            </Group>
                        </Dropzone>
                    )}
                />
            </div>
            {!!keys && !uploadCoverImg && !!errors && errors[final] && errors[final][index] && (
                <div className={'text-red-500 pt-2'}>Image is required *</div>
            )}
            {invalid && <div className={'text-primary pt-2'}>Invalid image format !!</div>}
            {/*{console.log(errors['achievements'], value, errors[])}*/}
            {!keys && !uploadCoverImg && errors[value] && (
                <div className={'text-red-500 pt-2'}>Image is required *</div>
            )}
            {/*{*/}
            {/*    if (value !== 'achievements') {*/}
            {/*    form.values[value] = res.data.Location;*/}
            {/*} else {*/}
            {/*    form.values[value][index].achievementImg = res.data.Location;*/}
            {/*}*/}
            {/*}*/}
            {/*{value === 'achievements' && !!form.errors.achievements[index].achievementImg && (*/}
            {/*    <div className={'text-red-500 pt-2'}>Image is requireddd *</div>*/}
            {/*)}*/}
            {/*{console.log('vvvv', value, index, keys, getValues(value)[index][keys])}*/}
            {!keys && getValues(value) && (
                <div className={'pt-4 relative'}>
                    <div
                        className={
                            ' flex flex-col items-center block absolute top-12 left-8 hover:z-50 '
                        }
                    >
                        <div>
                            <IconEye size={40} stroke={1.5} />
                        </div>
                    </div>

                    <Image src={getValues(value)}
                        alt={'images'}
                        loading={'lazy'}
                        width={150}
                        height={100}
                        onClick={() => setOpened(!opened)}
                        className={
                            'cursor-pointer hover:opacity-70  hover:transition hover:ease-in'
                        }/>
                
                </div>
            )}

            {!!keys &&
                getValues(final) &&
                getValues(final)[index] &&
                getValues(final)[index][keys] && (
                    <div className={'pt-4 relative'}>
                        <div
                            className={
                                ' flex flex-col items-center block absolute top-12 left-8 hover:z-50 '
                            }
                        >
                            <div>
                                <IconEye size={40} stroke={1.5} />
                            </div>
                        </div>
                        <Image
                            src={getValues(`${final}.${index}.${keys}`)}
                            alt={'certification-image'}
                            loading={'lazy'}
                            width={150}
                            height={100}
                            onClick={() => setOpened(!opened)}
                            className={
                                'cursor-pointer hover:opacity-70  hover:transition hover:ease-in'
                            }
                        />
                    </div>
                )}
            {!keys && getValues(value) && (
                <Modal opened={opened} onClose={() => setOpened(false)} centered size={'600px'}>
                    <Image
                        src={getValues(value)}
                        alt={'certification-image'}
                        loading={'lazy'}
                            width={550}
                            height={450}
                       
                    />
                </Modal>
            )}
            {!!keys && getValues(value) && (
                // getValues(value)[index] &&
                // getValues(value)[index][keys] &&
                <Modal opened={opened} onClose={() => setOpened(false)} centered size={'600px'}>
                    <Image
                        src={getValues(`${final}.${index}.${keys}`)}
                        loading={'lazy'}
                        width={150}
                        height={100}
                        alt={'certification-image'}

                    />
                </Modal>
            )}
        </>
    );
};

export default ImageUpload;
