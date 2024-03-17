import { SerializedMessage } from './message';

type ChatNotification = {
    eventName: 'chat-group-message';
    message: SerializedMessage & { GroupID: number };
};

// type studyPlanNotification = {
//     eventName: 'study-plan-notification';
//     message: SerializedTask;
// };

type WarningNotification = {
    eventName: 'warning';
    message: any;
};

export type SseEvents =
    | ChatNotification
    // | studyPlanNotification
    | WarningNotification;
