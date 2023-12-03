import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3333',
    }),
    tagTypes: ['user'],
    endpoints(builder) {
        return {
            fetchUser: builder.query({
                providesTags: (_result, _error, user) => [
                    { type: 'user', id: user.id },
                ],
                query: (user) => {
                    return {
                        url: '/users',
                        method: 'GET',
                        params: {
                            userId: user.id,
                        },
                    };
                },
            }),
            addUser: builder.mutation({
                query: (user) => {
                    return {
                        url: '/users',
                        method: 'POST',
                        body: user,
                    };
                },
            }),
            loginUser: builder.mutation({
                query: (user) => {
                    return {
                        url: '/users',
                        method: "POST",
                        body: user,
                    }
                }
            }),
            updateUser: builder.mutation({
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
        };
    },
});

export { userApi };
export const { useFetchUserQuery, useAddUserMutation, useUpdateUserMutation, useLoginUserMutation } =
    userApi;
