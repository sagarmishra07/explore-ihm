import {fireDatabase} from '@/firebase/firebase';
import {equalTo, get, orderByChild, push, query, ref, remove, set} from 'firebase/database';
import {getDownloadURL, getStorage, ref as storeRef, uploadBytesResumable,} from 'firebase/storage';

export const firebaseStore = async (url: string, data: any) =>
    await set(ref(fireDatabase, url), data);

export const firebasePush = async (url: string, data: any) => {
    return push(ref(fireDatabase, url), data).key;
};

export const firebaseGet = async (url: string) =>
    await get(ref(fireDatabase, url)).then((snapshot) => snapshot.val());

export const firebaseGetOne = async (url: string, id: string) =>
    await get(ref(fireDatabase, url + '/' + id)).then((snapshot) =>
        snapshot.val()
    );

export const firebaseRemove = async (url: string, id: string) =>
    await remove(ref(fireDatabase, url + '/' + id));

//update api

export const firebaseUpdate = async (url: string, id: string, data: any) =>
    await set(ref(fireDatabase, url + '/' + id), data);

export const firebaseGetDataByQuery = async (url: string, field: string, value: string) =>
    await get(query(ref(fireDatabase, url), orderByChild(field), equalTo(value)))
        .then((snapshot) => snapshot.val());

export const firebaseUploadImages = async (
    url: string,
    images: any
) => {

    // const compressedImg: any = await handleImageUpload(images[0]);

    const imageInfo = await storeRef(getStorage(), `image/${url}/${images[0]?.name}`);

    const metadata = {
        contentType: `${images[0]?.imageType}` || 'pdf',
        //In this line you are adding the access token
    };

    await uploadBytesResumable(imageInfo, images[0], metadata);


    return await getDownloadURL(imageInfo)
};
