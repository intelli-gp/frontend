import { ToastPosition, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import NotificationAudio from '../../assets/sounds/Notification.mp3';
import {
    DismissButton,
    NotificationContent,
    NotificationImage,
    NotificationTitle,
} from './user-notification.style';

type UserNotificationProps = {
    ImageSrc: string;
    Title: string;
    Content: string;
    Linker: string;
    ImageLinker?: string;
    position?: ToastPosition;
    ContentPrefix?: string;
};

export const UserNotification = ({
    ImageSrc,
    Title,
    Content,
    Linker,
    ImageLinker,
    position = 'top-right',
    ContentPrefix,
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
    });
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
