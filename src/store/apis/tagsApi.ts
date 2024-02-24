import { appApi } from '.';
import { Response } from '../../types/response';

export const tagsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTags: builder.query<Response, void>({
            query: () => ({
                url: '/tags',
                method: 'GET',
            }),
        }),
        getSuggestedTags: builder.query<Response, number>({
            query: (limit: number) => ({
                url: '/tags/suggested',
                method: 'GET',
                params: { limit },
            }),
        }),
    }),
});

export const { useGetAllTagsQuery, useGetSuggestedTagsQuery } = tagsApi;
