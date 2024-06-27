import { AIMessageToSend, ReceivedAiMessage } from '../../types/ai';
import { GenericResponse } from '../../types/response';
import { appApi } from './appApi';

const aiApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAiMessages: builder.query<
            GenericResponse<ReceivedAiMessage[]>,
            void
        >({
            providesTags: ['Ai Messages'],
            query: () => ({
                url: '/ai-service/chat',
                method: 'GET',
            }),
        }),
        sendAiMessage: builder.mutation<
            GenericResponse<ReceivedAiMessage>,
            AIMessageToSend
        >({
            query: (message) => ({
                url: '/ai-service/chat',
                method: 'POST',
                body: message,
            }),
            onQueryStarted: async (_message , {dispatch, queryFulfilled}) => {
                    const {data} = await queryFulfilled;
                    dispatch(aiApi.util.updateQueryData('getAiMessages', undefined, (draft) => {
                        draft.data.push(data.data);
                    }));
            },
        }),
        generateAiVideo: builder.mutation<
            GenericResponse<{ Url: string }>,
            AIMessageToSend
        >({
            query: (message: AIMessageToSend) => ({
                url: '/ai-service/video',
                method: 'POST',
                body: message,
            }),
        }),
        testSubscription: builder.query<GenericResponse<boolean>, void>({
            query: () => ({
                url: '/auth/forbidden',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetAiMessagesQuery,
    useSendAiMessageMutation,
    useGenerateAiVideoMutation,
    useTestSubscriptionQuery,
} = aiApi;
