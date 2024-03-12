import { ReceivedUser } from './user';

export type GroupUser = Pick<
    ReceivedUser,
    'Username' | 'ID' | 'ProfileImage'
> & {
    Type: 'ADMIN' | 'MEMBER';
};

export type ReceivedGroup = {
    ID: string;
    GroupTitle: string;
    GroupDescription: string;
    GroupCoverImage: string;
    GroupTags: string[];
    GroupMembers: Array<GroupUser>;
    GroupOwner: Pick<ReceivedUser, 'Username' | 'ID' | 'Email'>;
    GroupUserCont: number;
};

export type GroupToSend = {
    GroupTitle: string;
    GroupDescription: string;
    GroupCoverImageUrl: string;
    GroupTags: string[];
    GroupMembers?: Array<GroupUser>;
    AddedGroupTags?: string[]; // Used when updating group
    RemovedGroupTags?: string[]; // Used when updating group
};
