import {
    CreateMessageDTO,
    ReceivedTypingDTO,
    SerializedMessage,
} from '../../types/message';
import { SendIsTypingDTO } from '../../types/message';
import { getSocket } from '../../utils/socket';
import { appApi } from './appApi';

const messageApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupMessages: builder.query<unknown, number>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                groupId,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                try {
                    await cacheDataLoaded;
                    let socket = await getSocket();
                    socket.emit('joinRoom', { ChatGroupId: groupId });
                    socket.on(
                        'allMessages',
                        (messages: SerializedMessage[]) => {
                            updateCachedData((draft) => {
                                (draft as SerializedMessage[]).push(
                                    ...messages,
                                );
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
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                try {
                    await cacheDataLoaded;
                    let socket = await getSocket();
                    socket.on('isTyping', (data: ReceivedTypingDTO) => {
                        updateCachedData((draft) => {
                            let index = (draft as string[]).findIndex(
                                (element) => element === data.Username,
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
        }),
    }),
});

export const {
    useGetGroupMessagesQuery,
    useSendMessageMutation,
    useReceiveTypingQuery,
    useSendTypingMutation,
} = messageApi;
