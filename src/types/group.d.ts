import { ReceivedUser } from './user';

export type GroupUser = Pick<
    ReceivedUser,
    'Username' | 'ID' | 'ProfileImage' | 'FullName'
> & {
    Type: 'ADMIN' | 'MEMBER';
    ConnectedStatus: boolean;
};

export type ReceivedGroup = {
    ID: string;
    GroupTitle: string;
    GroupDescription: string;
    GroupCoverImage: string;
    GroupTags: string[];
    GroupMembers: GroupUser[];
    GroupOwner: Pick<
        ReceivedUser,
        'Username' | 'ID' | 'Email' | 'FullName' | 'ProfileImage'
    >;
    GroupUserCont: number;
};

export type GroupWithRole = Partial<ReceivedGroup> & {
    /**
     * 'admin' | 'member' | 'owner'
     */
    UserRole: string;
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
