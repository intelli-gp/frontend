import { Response } from '../../types/response';
import { UserToSend } from '../../types/user';
import { appApi } from './appApi';

const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.query<Response, number>({
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
            query: (id) => {
                return {
                    url: '/users',
                    method: 'GET',
                    params: {
                        userId: id,
                    },
                };
            },
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
    }),
});

export const { useFetchUserQuery, useUpdateUserMutation } = userApi;
