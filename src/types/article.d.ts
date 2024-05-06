import { ReceivedUser } from './user';

export enum ArticleSectionType {
    Markdown = 'markdown',
    Image = 'image',
}

export type ArticleSection = {
    ID?: number;
    ContentType: ArticleSectionType;
    Value: string;
};

export type ArticleComment = {
    ID: number;
    Content: string;
    CreatedAt: string;
    ArticleID: number;
    IsNotificationViewed: boolean;
    LikedBy: Pick<
        ReceivedUser,
        'ID' | 'Username' | 'FullName' | 'ProfileImage'
    >
    Commenter: Pick<
        ReceivedUser,
        | 'ID'
        | 'Username'
        | 'FullName'
        | 'ProfileImage'
        | 'Connected'
        | 'DOB'
        | 'Email'
        | 'PhoneNumber'
    >;
    LikedBy: Omit<ReceivedUser, 'Password'>[];
};

export type ArticleLike = {
    ArticleID: number;
    CreatedAt: string;
    Liker: Pick<ReceivedUser, 'ID' | 'FullName' | 'Username' | 'ProfileImage'>;
    IsNotificationViewed: boolean;
};

// Receive from server
export type ReceivedArticle = {
    ID: number;
    Author: Pick<
        ReceivedUser,
        'FullName' | 'Username' | 'ProfileImage' | 'Headline'
    > & {
        FollowersCont: number;
    };
    CoverImage: string;
    ArticleTags: string[];
    Title: string;
    Sections: ArticleSection[];
    UpdatedAt: string;
    CreatedAt: string;
    LikedBy: Pick<
        ReceivedUser,
        | 'ProfileImage'
        | 'FullName'
        | 'Username'
        | 'DOB'
        | 'ID'
        | 'Headline'
        | 'Email'
    >[];
    Comments: ArticleComment[];
};

// Send to server
export type ArticleSectionToSend = [string, ArticleSectionType];
export type ArticleToSend = {
    title: string;
    coverImageUrl: string;
    tags: string[];
    sections: ArticleSectionToSend[];
    addedTags?: string[]; // Used on updating
    removedTags?: string[]; // Used on updating
};
