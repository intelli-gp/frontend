import { User, UserToSend } from './user';

export enum ArticleSectionType {
    Markdown = 'markdown',
    Image = 'image',
}

export type ArticleSection = {
    id?: number;
    contentType: ArticleSectionType;
    value: string;
};

// Receive from server
export type ReceivedArticle = {
    ID: number;
    author: Partial<UserToSend>;
    coverImageUrl: string;
    tags: string[];
    title: string;
    sections: ArticleSection[];
    updatedAt: string;
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
