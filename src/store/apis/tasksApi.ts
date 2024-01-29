import { appApi } from '.';

export const taskApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        removeTask: builder.mutation({
            invalidatesTags: ['Task'],
            query: (task) => {
                return {
                    url: `study-planner/${task.id}`,
                    method: 'DELETE',
                };
            },
        }),
        addTasks: builder.mutation({
            invalidatesTags: ['Task'],
            query: (task) => ({
                url: '/study-planner',
                method: 'POST',
                body: {
                    Title: task.title,
                    StartDate: task.due_start,
                    DueDate: task.due_end,
                    Description: task.description,
                    Status: task.status,
                },
            }),
        }),
        fetchTasks: builder.query({
            providesTags: ['Task'],
            query: () => ({
                url: '/study-planner',
                method: 'GET',
            }),
        }),
        editTask: builder.mutation({
            invalidatesTags: ['Task'],
            query: (task) => ({
                url: `/study-planner/${task.id}`,
                method: 'PATCH',
                body: {
                    Title: task.title,
                    StartDate: task.due_start,
                    DueDate: task.due_end,
                    Description: task.description,
                    Status: task.status,
                },
            }),
        }),
    }),
});

export const {
    useFetchTasksQuery,
    useAddTasksMutation,
    useRemoveTaskMutation,
    useEditTaskMutation,
} = taskApi;
