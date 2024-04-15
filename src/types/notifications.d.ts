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
type EventType = {
    eventName: 'event-type';
    message: string;
};
export type MessagesNotification = {
    Group: Pick<ReceivedGroup, 'ID' | 'GroupTitle' | 'GroupCoverImage'> & {
        GroupName: string;
    };
    LastMessage?: Pick<
        SerializedMessage,
        'Content' | 'CreatedAt' | 'IsDeleted' | 'MessageID' | 'User'
    >;
    UnreadMessagesCount?: number;
};
type WarningNotification = {
    eventName: 'warning';
    message: any;
};

export type Notification = {
    Username: string;
    UserImage: string;
    Action: 'starred' | 'commented' | 'followed' | 'created';
    Read: boolean;
    CreatedAt: string;
    TargetID: string;
};

export type SseEvents = ChatNotification | WarningNotification;
