import { ReceivedUser, UserToSend } from './user';

export enum ArticleSectionType {
    Markdown = 'markdown',
    Image = 'image',
}

export type ArticleSection = {
    ID?: number;
    ContentType: ArticleSectionType;
    Value: string;
};

// Receive from server
export type ReceivedArticle = {
    ID: number;
    Author: Pick<ReceivedUser, 'FullName' | 'Username' | 'ProfileImage'> & {
        FollowersCont: number;
    };
    CoverImage: string;
    ArticleTags: string[];
    Title: string;
    Sections: ArticleSection[];
    UpdatedAt: string;
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
