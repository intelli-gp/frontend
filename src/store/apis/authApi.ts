import { User, UserCredentials } from '../../types/user';
import { appApi } from './appApi';
import { Response } from '../../types/response';

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<Response, UserCredentials>({
            query: (user) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: user,
                };
            },
        }),
        signUp: builder.mutation<Response, Partial<User>>({
            query: (user) => {
                return {
                    url: 'auth/signup',
                    method: 'POST',
                    body: user,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation, useSignUpMutation } = authApi;
