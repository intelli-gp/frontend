import { GroupToSend } from '../../types/group';
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
        getGroup: builder.query<Response, string>({
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
        updateGroup: builder.mutation<
            Response,
            Partial<GroupToSend> & { id: string }
        >({
            invalidatesTags: (_result, _error, update) => [
                { type: 'Group', id: update.id },
            ],
            query: (update) => ({
                url: `/chat-groups/${update.id}`,
                method: 'PUT',
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
            query: (groupId) => ({
                url: `/chat-groups/join`,
                method: 'POST',
                body: {
                    ChatGroupId: groupId,
                },
            }),
        }),
        leaveGroup: builder.mutation<Response, string>({
            query: (groupId) => ({
                url: `/chat-groups/leave`,
                method: 'POST',
                body: {
                    ChatGroupId: groupId,
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
} = groupsApi;
