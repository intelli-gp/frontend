import { User } from './user';

export type Blog = {
    author: Partial<User>;
    title: string;
    content: string;
    coverImageUrl: string;
    createdAt: string;
    tags: string[];
};
