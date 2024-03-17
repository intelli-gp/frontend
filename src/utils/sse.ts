import { EventSourcePolyfill } from 'event-source-polyfill';

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
            case 'chat-group-message':
                return messageNotification(eventData as ChatNotification);
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
