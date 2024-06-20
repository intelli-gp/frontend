import { Socket, io } from 'socket.io-client';

import { RootState, clearCredentials, setCredentials, store } from '../store';
import {
    ClientToServerEvents,
    EmitTypes,
    ServerToClientEvents,
    SocketCustomError,
} from '../types/message';
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
            socket.on('error', socketErrorHandler);
            socket.on('connect_error', async () => {
                /**
                 * Usually, this error is thrown when the token is invalid.
                 * This is not the best way to handle this error, but it works for now.
                 */
                socket.auth = { token: await _getNewToken() };
                socket.connect();
            });
            socket.on('tokenRefreshed', console.log);
        }
        await lock.release();
        resolve(socket);
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
    console.log('Unimplemented socketErrorHandler', error);
}

async function _getNewToken() {
    // Send a request to the server to refresh the token.
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/auth/refresh`,
        {
            method: 'POST',
            credentials: 'include', // Include cookies in the request.
        },
    );

    // Extract the data from the response.
    const {
        data,
    }: GenericResponse<{
        access_token: string;
    }> = await response.json();

    return data.access_token;
}

export async function renewSocketToken() {
    const access_token = await _getNewToken();
    if (access_token) {
        const user = (store.getState() as RootState).auth.user;
        store.dispatch(
            setCredentials({
                user,
                token: access_token,
            }),
        );
        const socket = await getSocket();
        socket.emit('refreshToken', { accessToken: access_token });
    } else {
        store.dispatch(clearCredentials());
        console.error('Failed to refresh token from inside socket');
        routingHelper.navigate('/auth/login');
    }
}

/**
 * Wrapper around socket.emit to handle authentication errors.
 */
export async function socketEmit(
    event: keyof ClientToServerEvents,
    data: EmitTypes,
) {
    const socket = await getSocket();
    socket.emit(event, data as any, async ({ error }: SocketCustomError) => {
        // Check of an error occurred.
        if (!error) return;

        switch (error) {
            case 'AuthFailedError':
                // If the error is an authentication error, try to refresh the token.
                await renewSocketToken();
                // Redo the failed request.
                await socketEmit(event, data);
        }
    });
}
