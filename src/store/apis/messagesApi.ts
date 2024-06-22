import { notificationApi, store } from '..';
import {
    CreateMessageDTO,
    MessageInfo,
    ReceivedTypingDTO,
    SerializedMessage,
} from '../../types/message';
import {
    DeleteMessageDTO,
    SendIsTypingDTO,
    UpdateMessageDTO,
} from '../../types/message';
import { ReactToMessageDTO } from '../../types/message';
import { getSocket, socketEmit } from '../../utils/socket';
import { appApi } from './appApi';

const messageApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupMessages: builder.query<SerializedMessage[], number>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                groupId,
                { updateCachedData, cacheEntryRemoved },
            ) {
                try {
                    let socket = await getSocket();
                    await socketEmit('joinRoom', {
                        ChatGroupId: groupId,
                    });
                    socket.on(
                        'allMessages',
                        (messages: SerializedMessage[]) => {
                            /**
                             * Refetch the messages notification to update the unread messages count.
                             * This is done inside this handler to make sure that messages status got
                             * updated in the backend before updating the notification state.
                             */
                            let { refetch } = store.dispatch(
                                notificationApi.endpoints.fetchMessages.initiate(),
                            );
                            refetch();
                            updateCachedData(() => {
                                return messages;
                            });
                        },
                    );
                    socket.on('newMessage', (message: SerializedMessage) => {
                        updateCachedData((draft) => {
                            (draft as SerializedMessage[]).push(message);
                        });
                    });
                    socket.on(
                        'editedMessage',
                        (updatedMessage: SerializedMessage) => {
                            updateCachedData((draft) => {
                                let index = (
                                    draft as SerializedMessage[]
                                ).findIndex(
                                    (cachedMessage) =>
                                        cachedMessage.MessageID ===
                                        updatedMessage.MessageID,
                                );
                                if (index > -1) {
                                    (draft as SerializedMessage[])[index] =
                                        updatedMessage;
                                }
                            });
                        },
                    );
                    await cacheEntryRemoved;
                    await socketEmit('leaveRoom', {
                        ChatGroupId: groupId,
                    });
                    socket.off('allMessages');
                    socket.off('newMessage');
                } catch (error) {
                    console.error(error);
                }
            },
            keepUnusedDataFor: 1, // Invalidate the data once the component is unmounted.
        }),
        sendMessage: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: CreateMessageDTO) {
                try {
                    await socketEmit('createMessage', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        sendTyping: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: SendIsTypingDTO) {
                try {
                    await socketEmit('typing', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        receiveTyping: builder.query<string[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                _,
                { updateCachedData, cacheEntryRemoved },
            ) {
                try {
                    let socket = await getSocket();
                    socket.on('isTyping', (data: ReceivedTypingDTO) => {
                        updateCachedData((draft) => {
                            let index = (draft as string[]).findIndex(
                                (username) => username === data.Username,
                            );

                            if (index === -1) {
                                (draft as string[]).push(data.Username);
                            }

                            if (index > -1 && !data.IsTyping) {
                                (draft as string[]).splice(index, 1);
                            }
                        });
                    });
                    await cacheEntryRemoved;
                    socket.off('isTyping');
                } catch (error) {
                    console.error(error);
                }
            },
            keepUnusedDataFor: 1, // Invalidate the data once the component is unmounted.
        }),
        deleteMessage: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: DeleteMessageDTO) {
                try {
                    await socketEmit('deleteMessage', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        updateMessage: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: UpdateMessageDTO) {
                try {
                    await socketEmit('editMessage', data);
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        reactToMessage: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: ReactToMessageDTO) {
                try {
                    await socketEmit('reactToMessage', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        getMessageInfo: builder.query<MessageInfo[], number>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(MessageID, { cacheEntryRemoved }) {
                // runs when a new component subscribe to the query
                try {
                    await cacheEntryRemoved;
                    await socketEmit('leaveMessageInfoRoom', {
                        MessageID,
                    });
                    let socket = await getSocket();
                    socket.off('newMessageReadInfo');
                    socket.off('messageInfo');
                } catch (error) {
                    console.error(error);
                }
            },
            async onQueryStarted(MessageID, { updateCachedData }) {
                // runs when the query is called
                try {
                    await socketEmit('getMessageInfo', { MessageID });
                    let socket = await getSocket();
                    socket.on('messageInfo', (messages: MessageInfo[]) => {
                        updateCachedData(() => messages);
                    });
                    socket.on(
                        'newMessageReadInfo',
                        (messages: MessageInfo[]) => {
                            updateCachedData(() => messages);
                        },
                    );
                } catch (error) {
                    console.error(error);
                }
            },
            keepUnusedDataFor: 0, // Invalidate the data once the component is unmounted.
        }),
    }),
});

export const {
    useGetGroupMessagesQuery,
    useSendMessageMutation,
    useReceiveTypingQuery,
    useSendTypingMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useGetMessageInfoQuery,
    useLazyGetMessageInfoQuery,
    useReactToMessageMutation,
} = messageApi;
