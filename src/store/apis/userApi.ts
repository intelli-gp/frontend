import { PaginatedResult } from '../../types/pagination';
import { GenericResponse, Response } from '../../types/response';
import { ReceivedUser, UserToSend } from '../../types/user';
import { appApi } from './appApi';

const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.query<Response, string>({
            providesTags: (_result, _error, Username) => [
                { type: 'User', Username },
            ],
            query: (Username) => {
                return {
                    url: `/users/${Username}`,
                    method: 'GET',
                };
            },
            keepUnusedDataFor: 0,
        }),
        updateUser: builder.mutation<Response, Partial<UserToSend>>({
            invalidatesTags: (_result, _error, user) => [
                { type: 'User', id: user.id },
            ],
            query: (user) => {
                return {
                    method: 'PATCH',
                    url: `/users`,
                    body: user,
                };
            },
        }),
        toggleFollowUser: builder.mutation<GenericResponse<number>, number>({
            invalidatesTags: ['Followings', 'Followers'],
            query: (id) => {
                return {
                    url: `users/toggle-follow/${id}`,
                    method: 'GET',
                };
            },
        }),
        getFollowers: builder.query<
            GenericResponse<PaginatedResult<ReceivedUser>>,
            number
        >({
            providesTags: ['Followers'],
            query: (id) => {
                return {
                    url: `users/followers/${id}`,
                    method: 'GET',
                };
            },
        }),
        getFollowing: builder.query<
            GenericResponse<PaginatedResult<ReceivedUser>>,
            number
        >({
            providesTags: ['Followings'],
            query: (id) => {
                return {
                    url: `users/following/${id}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useFetchUserQuery,
    useLazyFetchUserQuery,
    useUpdateUserMutation,
    useToggleFollowUserMutation,
    useGetFollowersQuery,
    useGetFollowingQuery,
    useLazyGetFollowersQuery,
    useLazyGetFollowingQuery,
} = userApi;
