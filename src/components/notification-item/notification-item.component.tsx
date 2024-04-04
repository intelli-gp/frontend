import moment from 'moment';

import { Notification } from '../../types/notifications';
import {
    ContentContainer,
    ItemContainer,
    Time,
    UserImage,
    Username,
} from './notification-item.styles';

type NotificationItemProps = Notification & {};

const NotificationItem = ({
    Read,
    UserImage: Image,
    Username: username,
    Action,
    CreatedAt,
}: NotificationItemProps) => {
    let notificationTags = [];

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
        default:
            notificationText = 'performed an action';
            notificationTags.push('Unknown', 'Unknown');
            break;
    }

    return (
        <ItemContainer read={Read}>
            <UserImage src={Image} alt="User" />
            <ContentContainer>
                <Username>@{username}</Username>
                <p>{notificationText}</p>
                <Time>{moment(CreatedAt).fromNow()}</Time>
            </ContentContainer>
        </ItemContainer>
    );
};

export default NotificationItem;
