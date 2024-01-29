import { appApi } from '.';
import { ArticleToSend } from '../../types/article.d';

const articleApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        createArticle: builder.mutation<Response, ArticleToSend>({
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: article,
            }),
        }),
        getArticles: builder.query<Response, void>({
            query: () => ({
                url: '/articles',
                method: 'GET',
            }),
        }),
        getArticle: builder.query<Response, number>({
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
