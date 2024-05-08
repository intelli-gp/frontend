import { EventSourcePolyfill } from 'event-source-polyfill';

import { UserNotification } from '../components/user-notification/user-notification.component';
import {
    NOTIFICATION_SUB_TYPES,
    NOTIFICATION_TYPES,
} from '../enums/notification.enum';
import { notificationApi, store } from '../store';
import { ArticleComment, ArticleLike } from '../types/article';
import { NotificationReceiveType, SseEvents } from '../types/notifications';
import { GenericResponse } from '../types/response';
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
    subscription.onmessage = async (event) => {
        const eventData = JSON.parse(event.data) as SseEvents;

        // console.log(eventData); // Debugging
        switch (eventData.eventName) {
            case 'chat-group-message': {
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
                                                eventData.message.Group.ID
                                            ) {
                                                return {
                                                    ...group,
                                                    UnreadMessagesCount:
                                                        (group.UnreadMessagesCount ||
                                                            0) + 1,
                                                    LastMessage: {
                                                        Content:
                                                            eventData.message
                                                                .Content,
                                                        CreatedAt:
                                                            eventData.message
                                                                .CreatedAt,
                                                        User: eventData.message
                                                            .User,
                                                        IsDeleted:
                                                            eventData.message
                                                                .IsDeleted,
                                                        MessageID:
                                                            eventData.message
                                                                .MessageID,
                                                        Type: eventData.message
                                                            .Type,
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
                return UserNotification({
                    ImageSrc: eventData?.message?.Group?.GroupCoverImage,
                    Title: eventData?.message?.Group?.GroupTitle,
                    ContentPrefix: eventData?.message?.User?.FullName,
                    Content: eventData?.message?.Content,
                    Linker: `/app/chat-room/${eventData?.message?.Group?.ID}`,
                });
            }
            case 'article': {
                store.dispatch(
                    notificationApi.util.updateQueryData(
                        'fetchUserNotifications',
                        { limit: 10, offset: 0 },

                        (existingNotifications) => {
                            const existingNotificationsData = Object.assign(
                                existingNotifications?.data,
                            );

                            const updatedNotifications: GenericResponse<
                                SseEvents[]
                            > = {
                                status: 'success',
                                data: [eventData, ...existingNotificationsData],
                            };
                            return updatedNotifications;
                        },
                    ),
                );

                switch (eventData.type) {
                    case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                        .LIKE: {
                        const data = eventData as NotificationReceiveType<
                            'article',
                            ArticleLike
                        >;
                        return UserNotification({
                            ImageSrc: data?.message?.Liker?.ProfileImage,
                            ImageLinker: `/app/profile/${data?.message?.Liker?.Username}`,
                            Title: data?.message?.Liker?.FullName,
                            Content: 'has liked your article',
                            Linker: `/app/articles/${data?.message?.ArticleID}`,
                            ReadNotificationData: {
                                ID: data?.message?.ArticleID,
                                PrimaryType: NOTIFICATION_TYPES.ARTICLE,
                                SubType:
                                    NOTIFICATION_SUB_TYPES[
                                        NOTIFICATION_TYPES.ARTICLE
                                    ].LIKE,
                                NotificationSenderID: +data?.message?.Liker?.ID,
                            },
                        });
                    }
                    case NOTIFICATION_SUB_TYPES[NOTIFICATION_TYPES.ARTICLE]
                        .COMMENT: {
                        const data = eventData as NotificationReceiveType<
                            'article',
                            ArticleComment
                        >;
                        return UserNotification({
                            ImageSrc: data?.message?.Commenter?.ProfileImage,
                            ImageLinker: `/app/profile/${data?.message?.Commenter?.Username}`,
                            Title: data?.message?.Commenter?.FullName,
                            Content: 'has commented on your article',
                            Linker: `/app/articles/${data?.message?.ArticleID}`,
                            ReadNotificationData: {
                                ID: data?.message?.ID,
                                PrimaryType: NOTIFICATION_TYPES.ARTICLE,
                                SubType:
                                    NOTIFICATION_SUB_TYPES[
                                        NOTIFICATION_TYPES.ARTICLE
                                    ].COMMENT,
                            },
                        });
                    }
                    default: {
                        return infoToast(
                            `${eventData.type} is not a supported article notification sub-type`,
                        );
                    }
                }
            }
            default:
                return infoToast(
                    `${eventData.eventName} is not a supported notification type`,
                );
        }
    };
}

export function disconnectSSE() {
    if (subscription) {
        subscription.close();
        subscription = null!;
    }
}
