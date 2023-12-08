import {
    BaseQueryApi,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Response } from '../../types/response';
import { RootState, clearCredentials, setCredentials } from '..';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3333/api',
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
    let result = await baseQuery(args, api, extraOptions);
    console.log('inside baseQueryWithRefresh the result is: ', result);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery(
            { url: '/auth/refresh', method: 'POST' },
            api,
            extraOptions,
        );
        console.log(
            'inside baseQueryWithRefresh the refreshResult is: ',
            refreshResult,
        );

        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user;
            const token = (refreshResult.data as Response).data.access_token;
            api.dispatch(setCredentials({ user, token }));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearCredentials());
        }
    }

    return result;
};

export const appApi = createApi({
    reducerPath: 'app',
    baseQuery: baseQueryWithRefresh,
    endpoints: (_builder) => ({}),
    tagTypes: ['user'],
});