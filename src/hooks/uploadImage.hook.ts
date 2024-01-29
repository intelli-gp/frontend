import { useState } from 'react';

import { compressImage } from '../utils/compressImage';

export const useUploadImage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
        setIsLoading(false);
    };

    const trigger = async (image: string | File) => {
        image = await compressImage(image);

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'Mujedd');
        setIsLoading(true);
        try {
            let response: any = await fetch(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                },
            );
            response = await response.json();
            setIsLoading(false);
            return response.url;
        } catch (err) {
            throw new Error(err as string);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, reset, trigger };
};
