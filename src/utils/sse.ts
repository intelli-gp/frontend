import { EventSourcePolyfill } from 'event-source-polyfill';

import { UserNotification } from '../components/user-notification/user-notification.component';
import {
    NOTIFICATION_SUB_TYPES,
    NOTIFICATION_TYPES,
} from '../enums/notification.enum';
import { notificationApi, store } from '../store';
import {
    ArticleNotification,
    FollowNotification,
    MessageNotification,
    NotificationEvents,
} from '../types/notifications';
import { GenericResponse } from '../types/response';
import { showSystemNotification } from './notifications-api';
import { getNewToken } from './socket';
import { infoToast } from './toasts';

let subscription: EventSourcePolyfill;

export function connectSSE(token?: string) {
    if (subscription) {
        return subscription;
    }
    subscription = new EventSourcePolyfill(import.meta.env.VITE_SSE_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('Connected to SSE'); // Debugging
    subscription.onmessage = async (event) => {
        const eventData = JSON.parse(event.data) as NotificationEvents;
        const isEventMuted = eventData?.isMuted;
        console.log({ eventData }); // Debugging
        switch (eventData.EventName) {
            case NOTIFICATION_TYPES.MESSAGE: {
                const messageNotificationData =
                    eventData as MessageNotification;
                store.dispatch(async (dispatch) => {
                    try {
                        dispatch(
                            notificationApi.util.updateQueryData(
                                'fetchMessages',
                                undefined,
                                (existingGroups) => {
                                    const updatedGroups = existingGroups.map(
                                        (group) => {
                                            if (
                                                group.Group.ID ===
                                                messageNotificationData.Entity
                                                    .Group.ID
                                            ) {
                                                return {
                                                    ...group,
                                                    UnreadMessagesCount:
                                                        (group.UnreadMessagesCount ||
                                                            0) + 1,
                                                    LastMessage: {
                                                        Content:
                                                            messageNotificationData
                                                                .Entity.Content,
                                                        CreatedAt:
                                                            messageNotificationData
                                                                .Entity
                                                                .CreatedAt,
                                                        User: messageNotificationData.Sender,
                                                        IsDeleted:
                                                            messageNotificationData
                                                                .Entity
                                                                .IsDeleted,
                                                        MessageID:
                                                            messageNotificationData
                                                                .Entity
                                                                .MessageID,
                                                        Type: messageNotificationData
                                                            .Entity.Type,
                                                    },
                                                };
                                            }
                                            return group;
                                        },
                                    );
                                    return updatedGroups;
                                },
                            ),
                        );
                    } catch (error) {
                        console.error('Error refetching data:', error);
                    }
                });

                if (isEventMuted) return;

                showSystemNotification(
                    messageNotificationData?.Entity?.Group?.GroupTitle,
                    {
                        icon: messageNotificationData?.Entity?.Group
                            ?.GroupCoverImage,
                        body: `${messageNotificationData?.Sender?.FullName}: ${messageNotificationData?.Entity?.Content}`,
                        badge: messageNotificationData?.Entity?.Group
                            ?.GroupCoverImage,
                        data: `/app/chat-room/${messageNotificationData?.Entity?.Group?.ID}`,
                    },
                );
                return UserNotification({
                    ImageSrc:
                        messageNotificationData?.Entity?.Group?.GroupCoverImage,
                    Title: messageNotificationData?.Entity?.Group?.GroupTitle,
                    ContentPrefix: messageNotificationData?.Sender?.FullName,
                    Content: messageNotificationData?.Entity?.Content,
                    Linker: `/app/chat-room/${messageNotificationData?.Entity?.Group?.ID}`,
                });
            }

            case NOTIFICATION_TYPES.ARTICLE: {
                const articleNotificationData =
                    eventData as ArticleNotification;

                store.dispatch(
                    notificationApi.util.updateQueryData(
                        'fetchUserNotifications',
                        { limit: 10, offset: 0 },

                        (existingNotifications) => {
                            const existingNotificationsData = Object.assign(
                                existingNotifications?.data,
                            );

                            const updatedNotifications: GenericResponse<
                                NotificationEvents[]
                            > = {
                                status: 'success',
                                data: [
                                    articleNotificationData,
                                    ...existingNotificationsData,
                                ],
                            };
                            return updatedNotifications;
                        },
                    ),
                );

                let notificationContent = '';
                switch (articleNotificationData.Type) {
                    case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                        .LIKE:
                        notificationContent = `has liked ${
                            store.getState().auth.user?.ID ===
                            articleNotificationData?.Entity?.EntityCreator?.ID
                                ? 'your'
                                : `${articleNotificationData?.Entity?.EntityCreator?.FullName}'s`
                        } article`;
                        break;
                    case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                        .COMMENT:
                        notificationContent = `has commented on ${
                            store.getState().auth.user?.ID ===
                            articleNotificationData?.Entity?.EntityCreator?.ID
                                ? 'your'
                                : `${articleNotificationData?.Entity?.EntityCreator?.FullName}'s`
                        } article`;
                        break;
                    case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                        .CREATE:
                        notificationContent = 'has posted a new article';
                        break;
                    default:
                        notificationContent =
                            'You received an unsupported notification';
                        break;
                }

                if (isEventMuted) return;

                showSystemNotification(
                    articleNotificationData?.Sender?.FullName,
                    {
                        icon: articleNotificationData?.Sender?.ProfileImage,
                        body: notificationContent,
                        badge: articleNotificationData?.Sender?.ProfileImage,
                        data: `/app/articles/${articleNotificationData?.Entity?.ID}`,
                    },
                );

                return UserNotification({
                    ImageSrc: articleNotificationData?.Sender?.ProfileImage,
                    ImageLinker: `/app/profile/${articleNotificationData?.Sender?.Username}`,
                    Title: articleNotificationData?.Sender?.FullName,
                    Content: notificationContent,
                    Linker: `/app/articles/${articleNotificationData?.Entity?.ID}`,
                    ReadNotificationData: {
                        NotificationID: articleNotificationData?.ID,
                    },
                });
            }

            case NOTIFICATION_TYPES.FOLLOW: {
                const followNotificationData = eventData as FollowNotification;

                if (isEventMuted) return;
                showSystemNotification(
                    followNotificationData?.Sender?.FullName,
                    {
                        icon: followNotificationData?.Sender?.ProfileImage,
                        body: 'followed you',
                        badge: followNotificationData?.Sender?.ProfileImage,
                        data: `/app/profile/${followNotificationData?.Sender?.Username}`,
                    },
                );
                return UserNotification({
                    ImageSrc: followNotificationData?.Sender?.ProfileImage,
                    ImageLinker: `/app/profile/${followNotificationData?.Sender?.Username}`,
                    Title: followNotificationData?.Sender?.FullName,
                    Content: 'followed you',
                    Linker: `/app/profile/${followNotificationData?.Sender?.Username}`,
                    ReadNotificationData: {
                        NotificationID: followNotificationData?.ID,
                    },
                });
            }
            default:
                return infoToast(
                    `${eventData.EventName} is not a supported notification type`,
                );
        }
    };

    subscription.onerror = async (error) => {
        switch ((error as any).status) {
            case 401:
            case 403: {
                console.log('Token expired, renewing token...')
                const newToken = await getNewToken();
                if (newToken) {
                    disconnectSSE();
                    connectSSE(newToken);
                } else {
                    console.error('Failed to renew token');
                }
            }
        }
    };
}

export function disconnectSSE() {
    if (subscription) {
        subscription.close();
        subscription = null!;
    }
}
