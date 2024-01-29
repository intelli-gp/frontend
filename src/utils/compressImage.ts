import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

export const compressImage = async (file: File | string) => {
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    if (typeof file === 'string') {
        file = await imageCompression.getFilefromDataUrl(file, uuidv4());
    }

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
};
