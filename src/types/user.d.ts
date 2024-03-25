import { ReceivedArticle } from './article';
import { ReceivedGroup } from './group';

export type ReceivedUser = {
    ID: string;
    FullName: string;
    Username: string;
    Email: string;
    Headline: string;
    DOB: string;
    UserLevel: unknown;
    SubscriptionsPlan: unknown;
    Bio: string;
    PhoneNumber: string;
    CoverImage: string;
    ProfileImage: string;
    UserTags: string[];
    GroupsCreated: Array<
        Pick<
            ReceivedGroup,
            'ID' | 'GroupTitle' | 'GroupCoverImage' | 'GroupUserCont'
        >
    >;
    GroupsJoined: Array<
        Pick<
            ReceivedGroup,
            'ID' | 'GroupTitle' | 'GroupCoverImage' | 'GroupUserCont'
        >
    >;
    Articles: Pick<
        ReceivedArticle,
        'ID' | 'Title' | 'CoverImage' | 'CreatedAt' | 'ArticleTags'
    >[];
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
