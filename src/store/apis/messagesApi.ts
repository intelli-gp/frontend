import {
    CreateMessageDTO,
    ReceivedTypingDTO,
    SerializedMessage,
} from '../../types/message';
import {
    DeleteMessageDTO,
    SendIsTypingDTO,
    UpdateMessageDTO,
} from '../../types/message';
import { getSocket } from '../../utils/socket';
import { appApi } from './appApi';

const messageApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupMessages: builder.query<unknown, number>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                groupId,
                { updateCachedData, cacheEntryRemoved },
            ) {
                try {
                    let socket = await getSocket();
                    socket.emit('joinRoom', { ChatGroupId: groupId });
                    socket.on(
                        'allMessages',
                        (messages: SerializedMessage[]) => {
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
                    await cacheEntryRemoved;
                    socket.emit('leaveRoom', { ChatGroupId: groupId });
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
                    let socket = await getSocket();
                    socket.emit('createMessage', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        sendTyping: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: SendIsTypingDTO) {
                try {
                    let socket = await getSocket();
                    socket.emit('typing', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        receiveTyping: builder.query<unknown, void>({
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
                    const socket = await getSocket();
                    socket.emit('deleteMessage', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        updateMessage: builder.mutation({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(data: UpdateMessageDTO) {
                try {
                    let socket = await getSocket();
                    socket.emit('editMessage', data);
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getMessageInfo: builder.query<unknown, number>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                MessageID,
                { updateCachedData, cacheEntryRemoved },
            ) {
                try {
                    let socket = await getSocket();
                    socket.emit('getMessageInfo', { MessageID });
                    socket.on('messageInfo', (messages: any) => {
                        console.log(messages);
                        updateCachedData(() => {
                            return messages;
                        });
                    });
                    socket.on('newMessageReadInfo', (message: any) => {
                        console.log(message);
                        updateCachedData((draft) => {
                            (draft as any).push(message);
                        });
                    });
                    await cacheEntryRemoved;
                    socket.off('messageInfo');
                } catch (error) {
                    console.error(error);
                }
            },
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
    useLazyGetMessageInfoQuery
} = messageApi;
