import { GroupToSend, GroupUser } from '../../types/group';
import { Response } from '../../types/response';
import { appApi } from './appApi';

export const groupsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        addGroup: builder.mutation<Response, GroupToSend>({
            invalidatesTags: ['Group'],
            query: (group) => {
                return {
                    url: '/chat-groups',
                    method: 'POST',
                    body: group,
                };
            },
        }),
        getAllGroups: builder.query<Response, void>({
            providesTags: ['Group'],
            query: () => ({
                url: '/chat-groups',
                method: 'GET',
            }),
        }),
        getGroup: builder.query<Response, number>({
            providesTags: (_result, _error, groupId) => [
                { type: 'Group', id: groupId },
            ],
            query: (groupId) => ({
                url: `/chat-groups`,
                method: 'GET',
                params: {
                    ID: groupId,
                },
            }),
        }),
        //Ask Them to add Id
        getUserGroups: builder.query<Response, void>({
            providesTags: ['Group'],
            query: () => ({
                url: '/chat-groups/joined',
                method: 'GET',
            }),
        }),
        updateGroup: builder.mutation<
            Response,
            Partial<GroupToSend> & { id: string }
        >({
            invalidatesTags: (_result, _error, update) => [
                { type: 'Group', id: update.id },
            ],
            query: (update) => ({
                url: `/chat-groups/${update.id}`,
                method: 'PATCH',
                body: update,
            }),
        }),
        deleteGroup: builder.mutation<Response, string>({
            invalidatesTags: ['Group'],
            query: (groupId) => ({
                url: `/chat-groups/${groupId}`,
                method: 'DELETE',
            }),
        }),
        joinGroup: builder.mutation<Response, string>({
            invalidatesTags: (_result, _error) => [{ type: 'Group' }],
            query: (groupId) => ({
                url: `/chat-groups/join`,
                method: 'POST',
                body: {
                    ChatGroupId: groupId,
                },
            }),
        }),
        leaveGroup: builder.mutation<Response, string>({
            invalidatesTags: (_result, _error) => [{ type: 'Group' }],
            query: (groupId) => ({
                url: `/chat-groups/leave`,
                method: 'PATCH',
                body: {
                    ChatGroupId: groupId,
                },
            }),
        }),
        PermissionGroup: builder.mutation<
            Response,
            Partial<GroupUser> & { id: string }
        >({
            invalidatesTags: (_result, _error, update) => [
                { type: 'Group', id: update.id },
            ],
            query: (update) => ({
                url: `/chat-groups/permission/${update.id}`,
                method: 'PATCH',
                body: {
                    TargetID: update.ID,
                    permissionLevel: update.Type,
                },
            }),
        }),
    }),
});

export const {
    useAddGroupMutation,
    useGetAllGroupsQuery,
    useGetGroupQuery,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
    useJoinGroupMutation,
    useLeaveGroupMutation,
    usePermissionGroupMutation,
    useGetUserGroupsQuery,
} = groupsApi;
