import { toast } from 'react-hot-toast';

export const successToast = (message: string) =>
    toast.success(message, {
        iconTheme: {
            primary: '#312e81',
            secondary: '#fff',
        },
    });

export const errorToast = (message: string) =>
    toast.error(message, {
        iconTheme: {
            primary: '#b91c1c',
            secondary: '#fff',
        },
    });
