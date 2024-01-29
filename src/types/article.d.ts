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
};
