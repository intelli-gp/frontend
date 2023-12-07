import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCredentials } from '../../types/user';
import { Response } from '../../types/response';
const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3333/api',
    }),
    tagTypes: ['user'],
    endpoints(builder) {
        return {
            fetchUser: builder.query<Response, number>({
                providesTags: (_result, _error, userId) => [
                    { type: 'user', id: userId },
                ],
                query: (userId) => {
                    return {
                        url: '/users',
                        method: 'GET',
                        params: {
                            userId,
                        },
                    };
                },
            }),
            addUser: builder.mutation<Response, User>({
                query: (user) => {
                    return {
                        url: 'auth/signup',
                        method: 'POST',
                        body: user,
                    };
                },
            }),
            updateUser: builder.mutation<Response, Partial<User>>({
                invalidatesTags: (_result, _error, user) => {
                    return [{ type: 'user', id: user.id }];
                },
                query: (user) => {
                    return {
                        method: 'PATCH',
                        url: '/users',
                        body: user,
                        params: {
                            userId: user.id,
                        },
                    };
                },
            }),
            loginUser: builder.mutation<Response, UserCredentials>({
                query: (user) => {
                    return {
                        url: '/auth/login',
                        method: 'POST',
                        body: user,
                    };
                },
            }),
            fetchRefreshToken: builder.mutation<Response, undefined>({
                query: () => {
                    return {
                        url: '/auth/refresh',
                        method: 'POST',
                    };
                },
            }),
        };
    },
});

export { userApi };
export const {
    useFetchUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
} = userApi;
