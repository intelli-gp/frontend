import { ReceivedGroup } from './group';
import { SerializedMessage } from './message';
import { ReceivedUser } from './user';

type ChatNotification = {
    eventName: 'chat-group-message';
    message: Pick<
        SerializedMessage,
        'Content' | 'CreatedAt' | 'IsDeleted' | 'MessageID'
    > & {
        Group: Pick<ReceivedGroup, 'ID' | 'GroupTitle' | 'GroupCoverImage'> & {
            GroupName: string;
        };
        User: Pick<
            ReceivedUser,
            'ID' | 'Username' | 'FullName' | 'ProfileImage'
        >;
    };
};

type WarningNotification = {
    eventName: 'warning';
    message: any;
};

export type SseEvents = ChatNotification | WarningNotification;
