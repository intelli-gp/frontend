import { appApi } from '.';
import { Task, sendTask } from '../../types/event';

export const taskApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        removeTask: builder.mutation({
            invalidatesTags: ['Task'],
            query: (ID) => {
                return {
                    url: `study-planner/${ID}`,
                    method: 'DELETE',
                };
            },
        }),
        addTasks: builder.mutation<Response, sendTask>({
            invalidatesTags: ['Task'],
            query: (task) => ({
                url: '/study-planner',
                method: 'POST',
                body: task,
            }),
        }),
        fetchTasks: builder.query<Response, void>({
            providesTags: ['Task'],
            query: () => ({
                url: '/study-planner',
                method: 'GET',
            }),
        }),
        editTask: builder.mutation<Response, Task>({
            invalidatesTags: ['Task'],
            query: (task) => ({
                url: `/study-planner/${task.ID}`,
                method: 'PATCH',
                body: task,
            }),
        }),
        fetchTask: builder.query({
            providesTags: ['Task'],
            query: (ID) => ({
                url: `/study-planner/${ID}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFetchTasksQuery,
    useAddTasksMutation,
    useRemoveTaskMutation,
    useEditTaskMutation,
    useFetchTaskQuery,
} = taskApi;
