import { appApi } from '.';
import { MessagesNotification } from '../../types/notifications';

export const notificationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchMessages: builder.query<MessagesNotification[],undefined>({
      query: () => ({
        url: '/notifications/messages',
        method: 'GET',
      }),
      providesTags: ['Messages'],
    }),
  }),
});

export const { useFetchMessagesQuery } = notificationApi;
