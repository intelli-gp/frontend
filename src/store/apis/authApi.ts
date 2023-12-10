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
        signUpUser: builder.mutation<Response, Partial<User>>({
            query: (user) => {
                return {
                    url: 'auth/signup',
                    method: 'POST',
                    body: user,
                };
            },
        }),
        logoutUser: builder.mutation<Response, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        resetPassword: builder.query<Response, string>({
            query: (email: string) => ({
                url: '/auth/reset-password',
                method: 'GET',
                params: { email },
            }),
        }),
        resetPasswordConfirm: builder.mutation<Response, string>({
            query: (password: string) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: { password },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useSignUpUserMutation,
    useLogoutUserMutation,
    useLazyResetPasswordQuery,
    useResetPasswordConfirmMutation
} = authApi;
