import { EventSourcePolyfill } from 'event-source-polyfill';

import { MessageNotification } from '../components/message-notification/message-notification.component';
import { notificationApi, store } from '../store';
import { ChatNotification, SseEvents } from '../types/notifications';
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
    subscription.onmessage = (event) => {
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
                //   const state = store.getState();
                //   const result = notificationApi.endpoints.fetchMessages.select(undefined)(state)
                //   console.log(result);
                return MessageNotification(eventData as ChatNotification);
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
