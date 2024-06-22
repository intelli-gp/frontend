import {
    ArticleNotificationType,
    NotificationType,
} from '../enums/notification.enum';
import {
    NOTIFICATION_SUB_TYPES,
    NOTIFICATION_TYPES,
} from '../enums/notification.enum';
import { ReceivedArticle } from './article';
import { ReceivedGroup } from './group';
import { SerializedMessage } from './message';
import { ReceivedUser } from './user';

export type NotificationType<T extends keyof typeof NOTIFICATION_TYPES | void> =
    T extends keyof typeof NOTIFICATION_TYPES
        ? (typeof NOTIFICATION_TYPES)[T]
        : (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

export type ArticleNotificationType<
    T extends keyof typeof ARTICLE_NOTIFICATION_TYPES | void,
> = T extends keyof typeof ARTICLE_NOTIFICATION_TYPES
    ? (typeof ARTICLE_NOTIFICATION_TYPES)[T]
    : (typeof ARTICLE_NOTIFICATION_TYPES)[keyof typeof ARTICLE_NOTIFICATION_TYPES];

export type NotificationSubtype<T extends keyof typeof NOTIFICATION_SUB_TYPES> =
    T extends keyof typeof NOTIFICATION_SUB_TYPES
        ? (typeof NOTIFICATION_SUB_TYPES)[T][keyof (typeof NOTIFICATION_SUB_TYPES)[T]]
        : never;

type ChatNotification = {
    eventName: NotificationPrimaryTypesEnum.MESSAGE;
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
        'Content' | 'CreatedAt' | 'IsDeleted' | 'MessageID' | 'User' | 'Type'
    >;
    UnreadMessagesCount?: number;
};

export type Notification = {
    Username: string;
    UserImage: string;
    Action: 'starred' | 'commented' | 'followed' | 'created';
    Read: boolean;
    CreatedAt: string;
    TargetID: string;
};

// TODO: DRY violation
export type ArticleNotification = {
    ID: number;
    EventName: NotificationType<'ARTICLE'>;
    Type: ArticleNotificationType<void>;
    Sender: Pick<ReceivedUser, 'ID' | 'ProfileImage' | 'Username' | 'FullName'>;

    Entity: Pick<ReceivedArticle, 'ID' | 'Title'> & {
        EntityCreator: Pick<
            ReceivedUser,
            'ID' | 'ProfileImage' | 'Username' | 'FullName'
        >;
    };
    isMuted: boolean;
};

export type MessageNotification = {
    ID: number;
    EventName: NotificationType<'MESSAGE'>;
    Type: null;
    Sender: Pick<ReceivedUser, 'ID' | 'ProfileImage' | 'Username' | 'FullName'>;
    Entity: Pick<
        SerializedMessage,
        'Content' | 'CreatedAt' | 'IsDeleted' | 'MessageID' | 'Type'
    > & {
        Group: Pick<ReceivedGroup, 'ID' | 'GroupTitle' | 'GroupCoverImage'>;
    };
    isMuted: boolean;
};

export type FollowNotification = {
    ID: number;
    EventName: NotificationType<'FOLLOW'>;
    Type: null;
    Sender: Pick<ReceivedUser, 'ID' | 'ProfileImage' | 'Username' | 'FullName'>;
    Entity: null;
    isMuted: boolean;
};

export type NotificationEvents =
    | ArticleNotification
    | MessageNotification
    | FollowNotification;

type ReadNotificationDto = {
    NotificationID: number;
};
