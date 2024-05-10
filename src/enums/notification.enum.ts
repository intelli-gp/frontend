export const NOTIFICATION_TYPES = {
    MESSAGE: 'chat-group-message',
    ARTICLE: 'article',
} as const;

export const ARTICLE_NOTIFICATION_TYPES = {
    LIKE: 'like',
    COMMENT: 'comment',
    COMMENT_REPLY: 'commentReply',
} as const;

export const NOTIFICATION_SUB_TYPES = {
    [NOTIFICATION_TYPES.ARTICLE]: ARTICLE_NOTIFICATION_TYPES,
    [NOTIFICATION_TYPES.MESSAGE]: {
        MESSAGE: 'message',
        EVENT: 'event',
        WARNING: 'warning',
    },
} as const;
