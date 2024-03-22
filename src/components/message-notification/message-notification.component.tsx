import { ToastPosition, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import NotificationAudio from '../../assets/sounds/Notification.mp3';
import { ChatNotification } from '../../types/notifications';
import {
    DismissButton,
    NotificationContent,
    NotificationImage,
    NotificationTitle,
} from './message-notification.style';

export const MessageNotification = (
    notification: ChatNotification,
    position: ToastPosition = 'top-right',
) => {
    // const navigate = useNavigate();
    console.log(notification);
    let dismiss = () => toast.dismiss(toastId);
    let toastId = toast(
        <div className={'flex gap-4 items-center !text-inherit'}>
            <NotificationImage
                src={
                    notification?.message?.Group?.GroupCoverImage ||
                    defaultUserImage
                }
                alt="sender profile image"
            />

            <Link
                className="flex flex-col !text-inherit gap-1"
                to={`/app/chat-room/${notification?.message?.Group?.ID}`}
                onClick={dismiss}
            >
                <NotificationTitle title={notification?.message?.Group?.GroupName}>
                    {notification?.message?.Group?.GroupName}
                </NotificationTitle>

                <NotificationContent
                    title={notification?.message?.Content}
                    lines={3}
                >
                    <span className="font-bold">
                        {notification?.message?.User?.FullName}:{' '}
                    </span>
                    {notification?.message?.Content}
                </NotificationContent>
            </Link>

            <DismissButton
                type="button"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    console.log('button clicked');
                    event.nativeEvent.preventDefault();
                    event.nativeEvent.stopImmediatePropagation();
                    dismiss();
                }}
                className="!rounded-lg z-50"
                title="Dismiss"
            >
                ✕
            </DismissButton>
        </div>,
        {
            position,
            duration: 100e3,
            className: 'message-toast',
        },
    );
    new Audio(NotificationAudio).play();
};
