import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { useReadNotificationMutation } from '../../store';
import { ReadNotificationDto } from '../../types/notifications';
import {
    ContentContainer,
    ItemContainer,
    Time,
    UserImage,
    Username,
} from './notification-item.styles';

const NotificationAction = {
    liked: 'liked',
    starred: 'starred',
    commented: 'commented',
    followed: 'followed',
    created: 'created',
} as const;

type NotificationItemProps = {
    Read: boolean;
    UserImage: string;
    Username: string;
    Action: keyof typeof NotificationAction;
    CreatedAt: string;
    Link: string;
    ReadNotificationData: ReadNotificationDto;
};

const NotificationItem = ({
    Read = false,
    UserImage: Image,
    Username: username,
    Action,
    CreatedAt,
    Link,
    ReadNotificationData,
}: NotificationItemProps) => {
    const navigate = useNavigate();

    const [readNotification] = useReadNotificationMutation();
    const notificationTags = [];

    const clickHandler = () => {
        readNotification(ReadNotificationData);
        navigate(Link);
    };

    let notificationText = '';
    switch (Action) {
        case 'starred':
            notificationText = 'starred your article';
            notificationTags.push('Starred', 'Article');
            break;
        case 'commented':
            notificationText = 'commented on your article';
            notificationTags.push('Commented', 'Article');
            break;
        case 'followed':
            notificationText = 'followed you';
            notificationTags.push('Followed', 'User');
            break;
        case 'created':
            notificationText = 'created a new article';
            notificationTags.push('Created', 'Article');
            break;
        case 'liked':
            notificationText = 'liked your article';
            notificationTags.push('Liked', 'Article');
            break;
        default:
            notificationText = 'performed an action';
            notificationTags.push('Unknown', 'Unknown');
            break;
    }

    return (
        <ItemContainer read={Read} onClick={clickHandler}>
            <UserImage src={Image} alt="User" fallbackType="user" />
            <ContentContainer>
                <Username>@{username}</Username>
                <p>{notificationText}</p>
                <Time>{moment(CreatedAt).fromNow()}</Time>
            </ContentContainer>
        </ItemContainer>
    );
};

export default NotificationItem;
