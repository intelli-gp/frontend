import { Response } from '../../types/response';
import { AutocompleteDto, SearchDto } from '../../types/search';
import { appApi } from './appApi';

const searchApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        generalSearch: builder.query<Response, SearchDto>({
            query: ({ searchTerm, limit = 10, offset = 0 }) => ({
                url: `/search`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
            keepUnusedDataFor: 5 * 60, // 5 minutes
        }),
        articlesSearch: builder.query<Response, SearchDto>({
            query: ({ searchTerm, limit = 10, offset = 0 }) => ({
                url: `/search/articles`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
            keepUnusedDataFor: 5 * 60, // 5 minutes
        }),
        groupsSearch: builder.query<Response, SearchDto>({
            query: ({ searchTerm, limit = 10, offset = 0 }) => ({
                url: `/search/chat-groups`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
            keepUnusedDataFor: 5 * 60, // 5 minutes
        }),
        usersSearch: builder.query<Response, SearchDto>({
            query: ({ searchTerm, limit = 10, offset = 0 }) => ({
                url: `/search/users`,
                method: 'GET',
                params: {
                    searchTerm,
                    limit,
                    offset,
                },
            }),
            keepUnusedDataFor: 5 * 60, // 5 minutes
        }),
        getAutocompleteSuggestions: builder.query<Response, AutocompleteDto>({
            query: ({ searchTerm, type }) => ({
                url: `/search/autocomplete`,
                method: 'GET',
                params: {
                    searchTerm,
                    type,
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
    useLazyGetAutocompleteSuggestionsQuery,
} = searchApi;
