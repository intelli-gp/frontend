import { useState } from 'react';
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
import { ArticleComment, ArticleLike } from '../../types/article';
import { NotificationReceiveType, SseEvents } from '../../types/notifications';
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


    const notifications = userNotifications?.data?.map(
        (notification: SseEvents) => {
            switch (notification.eventName) {
                case NOTIFICATION_TYPES.ARTICLE: {
                    switch (notification?.type) {
                        case ARTICLE_NOTIFICATION_TYPES.LIKE: {
                            const data =
                                notification as NotificationReceiveType<
                                    'article',
                                    ArticleLike
                                >;
                            return (
                                <NotificationItem
                                    key={`Article-${data?.message?.ArticleID}-Like-${data?.message?.Liker?.ID}-Notification${data?.createdAt}`}
                                    Action="liked"
                                    UserImage={
                                        data?.message?.Liker?.ProfileImage
                                    }
                                    Username={data?.message?.Liker?.Username}
                                    CreatedAt={data?.createdAt?.toString()}
                                    Read={data?.message?.IsNotificationViewed}
                                    Link={`/app/articles/${data?.message?.ArticleID}`}
                                    ReadNotificationData={{
                                        ID: +data?.message?.ArticleID,
                                        PrimaryType: NOTIFICATION_TYPES.ARTICLE,
                                        SubType:
                                            ARTICLE_NOTIFICATION_TYPES.LIKE,
                                        NotificationSenderID:
                                            +data?.message?.Liker?.ID,
                                    }}
                                />
                            );
                        }
                        case ARTICLE_NOTIFICATION_TYPES.COMMENT: {
                            const data =
                                notification as NotificationReceiveType<
                                    'article',
                                    ArticleComment
                                >;
                            return (
                                <NotificationItem
                                    key={`Article-${data?.message?.ArticleID}-Comment-${data?.message?.Commenter?.ID}-Notification${data?.createdAt}`}
                                    Action="commented"
                                    UserImage={
                                        data?.message?.Commenter?.ProfileImage
                                    }
                                    Username={
                                        data?.message?.Commenter?.Username
                                    }
                                    CreatedAt={data?.createdAt?.toString()}
                                    Read={data?.message?.IsNotificationViewed}
                                    Link={`/app/articles/${data?.message?.ArticleID}`}
                                    ReadNotificationData={{
                                        ID: +data?.message?.ID,
                                        PrimaryType: NOTIFICATION_TYPES.ARTICLE,
                                        SubType:
                                            ARTICLE_NOTIFICATION_TYPES.COMMENT,
                                        NotificationSenderID:
                                            +data?.message?.Commenter?.ID,
                                    }}
                                />
                            );
                        }
                        default:
                            break;
                    }
                }
            }
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
