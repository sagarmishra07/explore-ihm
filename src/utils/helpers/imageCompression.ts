import imageCompression from 'browser-image-compression';

export async function handleImageUpload(imageFile: any) {
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    try {
        // return compressedFile;
        // console.log('file', compressedFile);

        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        return await imageCompression(imageFile, options);
        // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
        console.log(error);
    }
}