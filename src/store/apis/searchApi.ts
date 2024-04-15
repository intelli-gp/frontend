import { Response } from '../../types/response';
import { appApi } from './appApi';

const searchApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        generalSearch: builder.query<Response, string>({
            query: (
                searchTerm: string,
                limit: number = 50,
                offset: number = 0,
            ) => ({
                url: `/search`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
        }),
        articlesSearch: builder.query<Response, string>({
            query: (
                searchTerm: string,
                limit: number = 50,
                offset: number = 0,
            ) => ({
                url: `/search/articles`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
        }),
        groupsSearch: builder.query<Response, string>({
            query: (
                searchTerm: string,
                limit: number = 50,
                offset: number = 0,
            ) => ({
                url: `/search/chat-groups`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
        }),
        usersSearch: builder.query<Response, string>({
            query: (
                searchTerm: string,
                limit: number = 50,
                offset: number = 0,
            ) => ({
                url: `/search/users`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
        }),
    }),
});

export const {
    useLazyGeneralSearchQuery,
    useLazyGroupsSearchQuery,
    useLazyArticlesSearchQuery,
    useLazyUsersSearchQuery,
} = searchApi;
