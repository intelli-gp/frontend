import { ToastPosition, toast } from 'react-hot-toast';

export const successToast = (message: string, position = 'bottom-right') =>
    toast.success(message, {
        iconTheme: {
            primary: '#312e81',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });

export const errorToast = (message: string, position = 'bottom-right') =>
    toast.error(message, {
        iconTheme: {
            primary: '#b91c1c',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });

export const warningToast = (message: string, position = 'bottom-right') => {
    toast(message, {
        icon: '⚠️',
        iconTheme: {
            primary: 'yellow',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });
};

export const infoToast = (message: string, position = 'bottom-right') => {
    toast(message, {
        icon: '❕',
        iconTheme: {
            primary: 'grey',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });
};
