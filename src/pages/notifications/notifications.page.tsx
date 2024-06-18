import { useState, useEffect } from 'react';
import { IoIosSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import NotificationItem from '../../components/notification-item/notification-item.component';
import {
    ARTICLE_NOTIFICATION_TYPES,
    NOTIFICATION_TYPES,
} from '../../enums/notification.enum';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { useFetchUserNotificationsQuery } from '../../store';
import {
    ArticleNotification,
    FollowNotification,
    NotificationEvents,
} from '../../types/notifications';
import { EditButton } from '../view-group/view-group.styles';
import { NotificationsContainer, PageContainer } from './notifications.styles';

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
    };

    const { data: userNotifications } = useFetchUserNotificationsQuery({
        limit: 10,
        offset: 0,
    });

    const getNotificationAction = (notification: NotificationEvents) => {
        switch (notification.EventName) {
            case NOTIFICATION_TYPES.ARTICLE:
                switch (notification.Type) {
                    case ARTICLE_NOTIFICATION_TYPES.LIKE:
                        return 'liked';
                    case ARTICLE_NOTIFICATION_TYPES.COMMENT:
                        return 'commented';
                    case ARTICLE_NOTIFICATION_TYPES.CREATE:
                        return 'created';
                    default:
                        return 'starred';
                }
            case NOTIFICATION_TYPES.FOLLOW:
                return 'followed';
            default:
                return 'starred';
        }
    };

    const getLink = (notification: NotificationEvents) => {
        switch (notification.EventName) {
            case NOTIFICATION_TYPES.ARTICLE: {
                const articleNotificationData =
                    notification as ArticleNotification;
                return `/app/articles/${articleNotificationData?.Entity?.ID}`;
            }
            case NOTIFICATION_TYPES.FOLLOW: {
                const followNotificationData =
                    notification as FollowNotification;
                return `/app/user/${followNotificationData?.Sender?.Username}`;
            }
            default:
                return '';
        }
    };

    useEffect(() => {
        document.title = 'Notifications | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    const notifications = userNotifications?.data?.map(
        (notification: NotificationEvents) => {
            return (
                <NotificationItem
                    key={`notification-${notification?.ID}`}
                    Action={getNotificationAction(notification)}
                    UserImage={notification?.Sender?.ProfileImage}
                    Username={notification?.Sender?.Username}
                    // TODO: add created At to the notification
                    CreatedAt={(notification as any)?.CreatedAt}
                    // TODO: add the notification message
                    Read={(notification as any)?.IsRead}
                    Link={getLink(notification)}
                    ReadNotificationData={{
                        NotificationID: notification?.ID,
                    }}
                />
            );
        },
    );

    return (
        <PageContainer {...BetweenPageAnimation}>
            <div className="flex justify-between items center">
                <PageTitle>Notification Center</PageTitle>
                <EditButton onClick={() => navigate('/app/settings')}>
                    <IoIosSettings size={24} />
                </EditButton>
            </div>
            <ExplorePageHeader
                WithoutButton
                searchValue={searchValue}
                onSearchValueChange={handleSearchValueChange}
            />
            <NotificationsContainer>{notifications}</NotificationsContainer>
        </PageContainer>
    );
};

export default NotificationsPage;
