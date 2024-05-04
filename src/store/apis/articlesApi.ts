import _ from 'lodash';

import { appApi } from '.';
import { ArticleToSend, ReceivedArticle } from '../../types/article.d';
import { GenericResponse, Response } from '../../types/response';

type LikeCommentPayload = {
    articleID: number;
    commentID: number;
};

const articleApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        createArticle: builder.mutation<
            GenericResponse<ReceivedArticle>,
            ArticleToSend
        >({
            invalidatesTags: ['Article'],
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: article,
            }),
        }),
        getArticles: builder.query<GenericResponse<ReceivedArticle[]>, void>({
            providesTags: (result) =>
                result?.data?.map(({ ID }) => ({
                    type: 'Article',
                    id: ID,
                })) ?? [],
            query: () => ({
                url: '/articles',
                method: 'GET',
            }),
        }),
        getArticle: builder.query<GenericResponse<ReceivedArticle>, number>({
            providesTags: (_result, _error, id) => [{ type: 'Article', id }],
            query: (id) => ({
                url: `/articles/${id}`,
                method: 'GET',
            }),
        }),
        //Ask Them to add Id
        getUserArticles: builder.query<
            GenericResponse<ReceivedArticle[]>,
            void
        >({
            providesTags: (result) =>
                result?.data?.map(({ ID }) => ({
                    type: 'Article',
                    id: ID,
                })) ?? [],
            query: () => ({
                url: '/articles/created',
                method: 'GET',
            }),
        }),
        updateArticle: builder.mutation<
            GenericResponse<ReceivedArticle>,
            Partial<ArticleToSend> & { id: number }
        >({
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Article', id },
            ],
            query: (update) => ({
                url: `/articles/${update.id}`,
                method: 'PATCH',
                body: _.omit(update, 'id'),
            }),
        }),
        deleteArticle: builder.mutation<Response, number>({
            invalidatesTags: ['Article'],
            query: (id) => ({
                url: `/articles/${id}`,
                method: 'DELETE',
            }),
        }),
        toggleLoveArticle: builder.mutation<
            GenericResponse<ReceivedArticle>,
            number
        >({
            invalidatesTags: (_result, _error, id) => [{ type: 'Article', id }],
            query: (id) => ({
                url: `/articles/${id}/toggle-like`,
                method: 'POST',
            }),
        }),
        commentOnArticle: builder.mutation<
            GenericResponse<ReceivedArticle>,
            { id: number; content: string }
        >({
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Article', id },
            ],
            query: ({ id, content }) => ({
                url: `/articles/${id}/comment`,
                method: 'POST',
                body: { Content: content },
            }),
        }),
        toggleLikeComment: builder.mutation<
            GenericResponse<ReceivedArticle>,
            LikeCommentPayload
        >({
            invalidatesTags: (_result, _error, { articleID }) => [
                { type: 'Article', id: articleID },
            ],
            query: ({ articleID, commentID }) => ({
                url: `/articles/${articleID}/comment/${commentID}/like`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useCreateArticleMutation,
    useGetArticlesQuery,
    useGetArticleQuery,
    useLazyGetArticleQuery,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
    useGetUserArticlesQuery,
    useToggleLoveArticleMutation,
    useCommentOnArticleMutation,
    useToggleLikeCommentMutation,
} = articleApi;
