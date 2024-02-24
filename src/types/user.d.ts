export type User = {
    user_id: string;
    full_name: string;
    username: string;
    email: string;
    dob: string;
    level_id: number;
    plan_id: number;
    bio: string;
    phone_number: string;
    cover_image: string;
    image: string;
    user_tag: string[];
};

export type UserToSend = {
    id: string;
    username: string;
    fullName: string;
    email: string;
    bio: string;
    dob: string;
    coverImage: string;
    phoneNumber: string;
    image: string;
    addedInterests: string[];
    removedInterests: string[];
    password: string;
};

export type UserCredentials = {
    email: string;
    password: string;
};
