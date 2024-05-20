import { ReceivedArticle } from '../../types/article';
import { ReceivedGroup } from '../../types/group';
import { PaginatedResult } from '../../types/pagination';
import { GenericResponse } from '../../types/response';
import {
    AutocompleteDto,
    GeneralSearchData,
    SearchDto,
} from '../../types/search';
import { ReceivedUser } from '../../types/user';
import { appApi } from './appApi';

const searchApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        generalSearch: builder.query<
            GenericResponse<GeneralSearchData>,
            SearchDto
        >({
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
        articlesSearch: builder.query<
            GenericResponse<PaginatedResult<ReceivedArticle>>,
            SearchDto
        >({
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
        groupsSearch: builder.query<
            GenericResponse<PaginatedResult<ReceivedGroup>>,
            SearchDto
        >({
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
        usersSearch: builder.query<
            GenericResponse<PaginatedResult<ReceivedUser>>,
            SearchDto
        >({
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
        getAutocompleteSuggestions: builder.query<
            GenericResponse<string[]>,
            AutocompleteDto
        >({
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
    usePrefetch: usePrefetchSearch,
} = searchApi;
