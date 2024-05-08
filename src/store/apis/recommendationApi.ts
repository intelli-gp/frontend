import { appApi } from '.';
import { ReceivedArticle } from '../../types/article';
import { PaginatedResult } from '../../types/pagination';
import { GenericResponse } from '../../types/response';
import { PaginationDto, SearchDto } from '../../types/search';
import { ReceivedUser } from '../../types/user';

export const recommendationApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchSpecificArticlesRecommendation: builder.query<
            GenericResponse<PaginatedResult<ReceivedArticle>>,
            SearchDto
        >({
            query: ({ searchTerm: articleId, limit = 10, offset = 0 }) => ({
                url: `/recommender-system/articles/${articleId}?limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
        }),
        fetchGeneralArticlesRecommendation: builder.query<
            GenericResponse<PaginatedResult<ReceivedArticle>>,
            PaginationDto
        >({
            query: ({ limit = 10, offset = 0 }) => ({
                url: `/recommender-system/articles?limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
        }),
        fetchGeneralUsersRecommendation: builder.query<
            GenericResponse<PaginatedResult<ReceivedUser>>,
            PaginationDto
        >({
            query: ({ limit = 10, offset = 0 }) => ({
                url: `/recommender-system/users?limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
        }),
        fetchSpecificUsersRecommendation: builder.query<
            GenericResponse<PaginatedResult<ReceivedUser>>,
            SearchDto
        >({
            query: ({ searchTerm: username, limit = 10, offset = 0 }) => ({
                url: `/recommender-system/users/${username}?limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFetchGeneralArticlesRecommendationQuery,
    useFetchSpecificArticlesRecommendationQuery,
    useFetchGeneralUsersRecommendationQuery,
    useFetchSpecificUsersRecommendationQuery,
    useLazyFetchGeneralArticlesRecommendationQuery,
    useLazyFetchSpecificArticlesRecommendationQuery,
    useLazyFetchGeneralUsersRecommendationQuery,
} = recommendationApi;
