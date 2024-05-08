import { ToastPosition, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import NotificationAudio from '../../assets/sounds/Notification.mp3';
import { ReadNotificationDto } from '../../types/notifications';
import {
    DismissButton,
    NotificationContent,
    NotificationImage,
    NotificationTitle,
} from './user-notification.style';

type UserNotificationProps = {
    /**
     * The image source of the main image in the notification.
     */
    ImageSrc: string;
    /**
     * The title of the notification.
     */
    Title: string;
    /**
     * The main content of the notification.
     */
    Content: string;
    /**
     * The link to navigate to when the notification is clicked.
     */
    Linker: string;
    /**
     * The link to navigate to when the image is clicked.
     * @NotImplemented
     */
    ImageLinker?: string;
    /**
     * The position of the toast notification.
     */
    position?: ToastPosition;
    /**
     * The prefix to add to the content. eg "New Message: "
     */
    ContentPrefix?: string;
    /**
     * The data to send to the server to mark the notification as read.
     * @NotImplemented
     */
    ReadNotificationData?: ReadNotificationDto;
};

export const UserNotification = ({
    ImageSrc,
    Title,
    Content,
    Linker,
    ImageLinker,
    position = 'top-right',
    ContentPrefix,
    ReadNotificationData,
}: UserNotificationProps) => {
    // const navigate = useNavigate();
    console.log({
        ImageSrc,
        ImageLinker,
        Title,
        Content,
        position,
        ContentPrefix,
        Linker,
        ReadNotificationData,
    });
    //TODO: Implement read notification
    const dismiss = () => toast.dismiss(toastId);
    const toastId = toast(
        <div className={'flex gap-4 items-center !text-inherit'}>
            <Link to={ImageLinker as string} onClick={dismiss}>
                <NotificationImage src={ImageSrc} alt="sender profile image" />
            </Link>

            <Link
                className="flex flex-col !text-inherit gap-1"
                to={Linker}
                onClick={dismiss}
            >
                <NotificationTitle title={Title}>{Title}</NotificationTitle>

                <NotificationContent title={Content} lines={3}>
                    {ContentPrefix && (
                        <span className="font-bold">{ContentPrefix}: </span>
                    )}
                    {Content}
                </NotificationContent>
            </Link>

            <DismissButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    console.log('button clicked');
                    event.nativeEvent.preventDefault();
                    event.nativeEvent.stopImmediatePropagation();
                    dismiss();
                }}
                className="z-50"
                title="Dismiss"
            >
                ✕
            </DismissButton>
        </div>,
        {
            position,
            duration: 3e3,
            className: 'message-toast',
        },
    );
    new Audio(NotificationAudio).play();
};
