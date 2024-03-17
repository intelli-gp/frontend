import { EventSourcePolyfill } from 'event-source-polyfill';

import { store } from '../store';
import { ChatNotification, SseEvents } from '../types/notifications';
import { infoToast, messageNotification } from './toasts';

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
        switch (eventData.eventName) {
            case 'chat-group-message': {
                let { user } = store.getState().auth;
                if (eventData?.message?.User?.ID === user.ID) return; // If message sent by me don't show me the notification.
                if (
                    !user?.GroupsJoined?.reduce((acc, cur) => {
                        acc.push(+(cur as any).GroupID);
                        return acc;
                    }, [] as number[]).includes(eventData?.message?.GroupID)
                )
                    return; // If I am not part of the group that received the message, don't show me the message.
                return messageNotification(eventData as ChatNotification);
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
