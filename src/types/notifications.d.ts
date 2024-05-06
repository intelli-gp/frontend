import {
    ArticleNotificationType,
    NotificationType,
} from '../enums/notification.enum';
import { ArticleComment, ArticleLike } from './article';
import { ReceivedGroup } from './group';
import { SerializedMessage } from './message';
import { ReceivedUser } from './user';

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

export type Notification = {
    Username: string;
    UserImage: string;
    Action: 'starred' | 'commented' | 'followed' | 'created';
    Read: boolean;
    CreatedAt: string;
    TargetID: string;
};

// for articles

export type ArticleLikeNotification = {
    eventName: NotificationType<'ARTICLE'>;
    type: ArticleNotificationType<'LIKE'>;
    message: ArticleLike;
};

export type ArticleCommentNotification = {
    eventName: NotificationType<'ARTICLE'>;
    type: ArticleNotificationType<'COMMENT'>;
    message: ArticleComment;
};

export type ArticleNotifications =
    | ArticleLikeNotification
    | ArticleCommentNotification;

export type SseEvents =
    | ChatNotification
    | WarningNotification
    | ArticleNotifications;

type ReadNotificationDto = {
    ID: number;
    PrimaryType: NotificationType<void>;
    SubType: string;
    NotificationSenderID: number;
};

// received notifications in notifications page

// TODO: use this across all notifications
export interface NotificationReceiveType<
    T extends NotificationType<void>,
    SerializedEntity,
> {
    createdAt: Date;
    eventName: T;
    type: NotificationSubtype<T>;
    message: SerializedEntity;
}
