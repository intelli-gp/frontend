import { RootState } from '..';
import { CreateMessageDTO, SerializedMessage } from '../../types/message';
import { getSocket } from '../../utils/socket';
import { appApi } from './appApi';

const messageApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getGroupMessages: builder.query<unknown, number>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                groupId,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    getState,
                },
            ) {
                try {
                    await cacheDataLoaded;
                    let { auth } = getState() as RootState;
                    let socket = await getSocket(auth.token);
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
            async onCacheEntryAdded(
                data: CreateMessageDTO,
                { cacheDataLoaded, getState },
            ) {
                try {
                    await cacheDataLoaded;
                    let { auth } = getState() as RootState;
                    let socket = await getSocket(auth.token);
                    socket.emit('createMessage', data);
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export const { useGetGroupMessagesQuery, useSendMessageMutation } = messageApi;
