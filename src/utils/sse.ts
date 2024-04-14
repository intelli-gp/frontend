import { EventSourcePolyfill } from 'event-source-polyfill';

import { MessageNotification } from '../components/message-notification/message-notification.component';
import { ChatNotification, SseEvents } from '../types/notifications';
import { infoToast } from './toasts';
import { notificationApi, store,  } from '../store';

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
                      dispatch(notificationApi.util.invalidateTags(['Messages']));
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


