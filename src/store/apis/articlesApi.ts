import { appApi } from '.';
import { ArticleToSend } from '../../types/article.d';

const articleApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        createArticle: builder.mutation<Response, ArticleToSend>({
            invalidatesTags: ['Article'],
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: article,
            }),
        }),
        getArticles: builder.query<Response, void>({
            providesTags: ['Article'],
            query: () => ({
                url: '/articles',
                method: 'GET',
            }),
        }),
        getArticle: builder.query<Response, number>({
            providesTags: (_result, _error, id) => [{ type: 'Article', id }],
            query: (id) => ({
                url: `/articles/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateArticleMutation,
    useGetArticlesQuery,
    useGetArticleQuery,
} = articleApi;
