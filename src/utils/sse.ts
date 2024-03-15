import { EventSourcePolyfill } from 'event-source-polyfill';

import { SseEvents } from '../types/notifications';
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
        infoToast(eventData.message.Content);
    };
}

export function disconnectSSE() {
    if (subscription) {
        subscription.close();
        subscription = null!;
    }
}
