import { Response } from '../../types/response';
import { UserToSend } from '../../types/user';
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
    }),
});

export const {
    useFetchUserQuery,
    useLazyFetchUserQuery,
    useUpdateUserMutation,
} = userApi;
