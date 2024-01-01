export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    imageUrl: string;
} & Record<string, any>;

export type UserCredentials = {
    email: string;
    password: string;
};
