import { AIMessageToSend, ReceivedAiMessage } from '../../types/ai';
import { GenericResponse } from '../../types/response';
import { appApi } from './appApi';

const aiApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAiMessages: builder.query<GenericResponse<ReceivedAiMessage[]>, void>({
            providesTags: ['Ai Messages'],
            query: () => ({
                url: '/ai-service/chat',
                method: 'GET',
            }),
        }),
        sendAiMessage: builder.mutation<
            GenericResponse<ReceivedAiMessage[]>,
            AIMessageToSend
        >({
            invalidatesTags: ['Ai Messages'],
            query: (message) => ({
                url: '/ai-service/chat',
                method: 'POST',
                body: message,
            }),
        }),
    }),
});

export const { useGetAiMessagesQuery, useSendAiMessageMutation } = aiApi;
