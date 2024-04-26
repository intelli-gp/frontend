import {
    BaseQueryApi,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { RootState, clearCredentials, setCredentials } from '..';
import { Response } from '../../types/response';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND}/api`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithRefresh = async (
    args: any,
    api: BaseQueryApi,
    extraOptions: any,
) => {
    /**
     * Try to execute the request with the given arguments.
     */
    let result = await baseQuery(args, api, extraOptions);

    /**
     * If the request fails with a 401 or 403 means that the token is expired or invalid.
     * In this case, try to refresh the token and execute the request again.
     */
    if ([401, 403].includes(result?.error?.status as number)) {
        /**
         * Send a request to the server to refresh the token.
         */
        const refreshResult = await baseQuery(
            { url: '/auth/refresh', method: 'POST' },
            api,
            extraOptions,
        );

        /**
         * If the refresh request is successful, update the token and execute the request again.
         */
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user;
            const token = (refreshResult.data as Response).data.access_token;
            api.dispatch(setCredentials({ user, token }));
            /**
             * Execute the request again with the new token.
             */
            result = await baseQuery(args, api, extraOptions);
        } else {
            /**
             * If the refresh request fails, clear the credentials and redirect the user to the login page.
             * Which means that the user is not authenticated anymore and need to login again.
             */
            api.dispatch(clearCredentials());
        }
    }

    return result;
};

export const appApi = createApi({
    reducerPath: 'app',
    baseQuery: baseQueryWithRefresh,
    endpoints: (_builder) => ({}),
    tagTypes: ['User', 'Task', 'Article', 'Group', 'Course','PaymentMethods'],
});
