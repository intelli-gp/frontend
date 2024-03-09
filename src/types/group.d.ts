export type UserGroup = {
    ID: string;
    username: string;
    profileImg: string;
    joiningStatus: boolean; 
    type: 'ADMIN' | 'MEMBER';
};
export type ReceivedGroup = {
    group_id: string;
    title: string;
    description: string;
    cover_image_url: string;
    GroupTags: string[];
    GroupMembers: Array<
        Partial<UserGroup>
    >;
    GroupOwner: Partial<User>;
};

export type GroupToSend = {
    GroupTitle: string;
    GroupDescription: string;
    GroupCoverImageUrl: string;
    GroupTags: string[];
    GroupMembers: Array<
        Partial<UserGroup> & { joining_status: boolean; type: 'ADMIN' | 'MEMBER' }
    >;
    AddedGroupTags?: string[]; // Used when updating group
    RemovedGroupTags?: string[]; // Used when updating group
};
