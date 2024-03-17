import { ToastPosition, toast } from 'react-hot-toast';

import defaultUserImage from '../assets/imgs/user.jpg';
import NotificationAudio from '../assets/sounds/Notification.mp3';
import {
    MessageContent,
    SenderName,
} from '../components/message/message.style';
import { HeaderButton as DismissButton } from '../pages/chat-room/chat-room.style';
import { ChatNotification } from '../types/notifications';

export const successToast = (message: string, position = 'top-right') =>
    toast.success(message, {
        iconTheme: {
            primary: '#312e81',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });

export const errorToast = (message: string, position = 'top-right') =>
    toast.error(message, {
        iconTheme: {
            primary: '#b91c1c',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });

export const warningToast = (message: string, position = 'top-right') => {
    toast(message, {
        icon: '⚠️',
        iconTheme: {
            primary: 'yellow',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });
};

export const infoToast = (message: string, position = 'top-right') => {
    toast(message, {
        icon: '❕',
        iconTheme: {
            primary: 'grey',
            secondary: '#fff',
        },
        position: position as ToastPosition,
    });
};

export const messageNotification = (
    notification: ChatNotification,
    position: ToastPosition = 'top-right',
) => {
    let dismiss = () => toast.dismiss(toastId);
    let toastId = toast(
        <div className={'flex gap-4 items-center'}>
            <img
                src={
                    notification?.message?.User?.ProfileImage ||
                    defaultUserImage
                }
                className="w-[3rem] h-[3rem] rounded-full object-cover"
                alt="sender profile image"
            />
            <div className="flex flex-col gap-1">
                <SenderName>Sender FullName</SenderName>
                <MessageContent
                    className="!opacity-80"
                    lines={3}
                    title={notification?.message?.Content}
                >
                    {notification?.message?.Content}
                </MessageContent>
            </div>
            <DismissButton
                type="button"
                onClick={dismiss}
                className="!rounded-lg"
                title="Dismiss"
            >
                ✕
            </DismissButton>
        </div>,
        {
            position,
        },
    );
    new Audio(NotificationAudio).play();
};
