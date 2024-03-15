import { SerializedMessage } from "./message";

type chatNotification = {
    eventName: 'chat-group-message';
    message: SerializedMessage;
};

// type studyPlanNotification = {
//     eventName: 'study-plan-notification';
//     message: SerializedTask;
// };

type warningNotification = {
    eventName: 'warning';
    message: any;
};

export type SseEvents =
    | chatNotification
    // | studyPlanNotification
    | warningNotification;
