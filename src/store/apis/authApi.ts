import { GenericResponse, Response } from '../../types/response';
import { ReceivedUser, UserCredentials, UserToSend } from '../../types/user';
import { appApi } from './appApi';

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<
            GenericResponse<{ user: ReceivedUser; access_token: string }>,
            UserCredentials
        >({
            query: (user) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: user,
                };
            },
        }),
        signUpUser: builder.mutation<
            GenericResponse<{ user: ReceivedUser; access_token: string }>,
            Partial<UserToSend>
        >({
            query: (user) => {
                return {
                    url: '/auth/signup',
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
                url: `/auth/reset-password/${email}`,
                method: 'GET',
            }),
        }),
        resetPasswordConfirm: builder.mutation<Response, any>({
            query: ({ password, email, token }) => ({
                url: `/auth/reset-password/${email}/${token}`,
                method: 'POST',
                body: { password },
            }),
        }),
        generate2fa: builder.query<ArrayBuffer, void>({
            query: () => ({
                url: '/auth/2fa/generate',
                method: 'GET',
                responseHandler: (response: any) => {
                    return response.arrayBuffer();
                },
            }),
        }),
        enable2fa: builder.mutation<
            GenericResponse<{ access_token: string }>,
            string
        >({
            query: (otp) => ({
                url: '/auth/2fa/enable',
                method: 'POST',
                body: { otp },
            }),
        }),
        authenticate2fa: builder.mutation<
            GenericResponse<{ access_token: string }>,
            string
        >({
            query: (otp) => ({
                url: '/auth/2fa/authenticate',
                method: 'POST',
                body: { otp },
            }),
        }),
        disable2fa: builder.mutation<
            GenericResponse<{ access_token: string }>,
            string
        >({
            query: (otp) => ({
                url: '/auth/2fa/disable',
                method: 'POST',
                body: { otp },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useSignUpUserMutation,
    useLogoutUserMutation,
    useLazyResetPasswordQuery,
    useResetPasswordConfirmMutation,
    useLazyGenerate2faQuery,
    useEnable2faMutation,
    useAuthenticate2faMutation,
    useDisable2faMutation,
} = authApi;
