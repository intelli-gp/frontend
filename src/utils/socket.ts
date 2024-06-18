import { Socket, io } from 'socket.io-client';

import { RootState, clearCredentials, setCredentials, store } from '../store';
import { ClientToServerEvents, ServerToClientEvents } from '../types/message';
import { GenericResponse, NestErrorResponse } from '../types/response';
import { Lock } from './asyncLock';
import { routingHelper } from './navigateHelper';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
let lock = new Lock();

export async function getSocket(
    token?: string,
): Promise<Socket<ServerToClientEvents, ClientToServerEvents>> {
    await lock.acquire();
    return new Promise(async (resolve) => {
        if (!socket) {
            socket = io(import.meta.env.VITE_WS_BACKEND, {
                auth: { token },
            });
            socket.on('connect', async () => {
                socket.on('error', socketErrorHandler);
                await lock.release();
                resolve(socket);
            });
        } else {
            await lock.release();
            resolve(socket);
        }
    });
}

export async function deleteSocket() {
    await lock.acquire();
    if (socket) {
        socket.disconnect();
        socket = undefined!;
    }
    await lock.release();
}

export async function socketErrorHandler(error: NestErrorResponse) {
    switch (error.statusCode) {
        case 401: {
            // Send a request to the server to refresh the token.
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND}/api/auth/refresh`,
                {
                    method: 'POST',
                },
            );

            // Extract the data from the response.
            const {
                data,
            }: GenericResponse<{
                access_token: string;
            }> = await response.json();

            // If the refresh request is successful, update the token and execute the request again.
            const { access_token } = data;
            if (access_token) {
                const user = (store.getState() as RootState).auth.user;
                store.dispatch(
                    setCredentials({
                        user,
                        token: access_token,
                    }),
                );
            } else {
                store.dispatch(clearCredentials());
                console.error('Failed to refresh token from inside socket');
                routingHelper.navigate('/auth/login');
            }
        }
    }
    await deleteSocket();
    await getSocket(store.getState().auth.token);
}
