import { User } from './user';

export type ReceivedGroup = {
    group_id: string;
    title: string;
    description: string;
    cover_image_url: string;
    GroupTags: string[];
    GroupMembers: Array<
        Partial<User> & { joining_status: boolean; type: 'ADMIN' | 'MEMBER' }
    >;
    GroupOwner: Partial<User>;
};

export type GroupToSend = {
    GroupTitle: string;
    GroupDescription: string;
    GroupCoverImageUrl: string;
    GroupTags: string[];
};
