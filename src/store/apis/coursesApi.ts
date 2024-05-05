import { appApi } from '.';
import { CategoryWithCourses, Course } from '../../types/course';
import { PaginatedResult } from '../../types/pagination';
import { GenericResponse } from '../../types/response';

export const courseApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecommendedCourses: builder.query<
            GenericResponse<PaginatedResult<Course>>,
            { limit?: number; offset?: number }
        >({
            query: ({ limit, offset }) => ({
                url: `/courses?${limit ? `limit=${limit}` : ''}${
                    offset ? `&offset=${offset}` : ''
                }
                `,
                method: 'GET',
            }),
        }),
        searchCourses: builder.query<
            GenericResponse<PaginatedResult<Course>>,
            {
                query: string;
                category?: string;
                limit?: number;
                offset?: number;
            }
        >({
            /**
             *
             * @param query search term
             * @param limit limit of courses per page
             * @param offset page number
             * @returns
             */
            query: ({ query, category, limit, offset }) => ({
                url: `/courses/search?query=${encodeURIComponent(query)}${
                    category ? `&category=${encodeURIComponent(category)}` : ''
                }${limit ? `&limit=${limit}` : ''}${
                    offset ? `&offset=${offset}` : ''
                }`,
                method: 'GET',
            }),
        }),
        getCoursesPreview: builder.query<
            GenericResponse<CategoryWithCourses[]>,
            void
        >({
            query: () => ({
                url: '/courses/preview',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useSearchCoursesQuery,
    useLazySearchCoursesQuery,
    useGetRecommendedCoursesQuery,
    useLazyGetRecommendedCoursesQuery,
    useGetCoursesPreviewQuery,
    usePrefetch: usePrefetchCourse,
} = courseApi;
