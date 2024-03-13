import { Socket, io } from 'socket.io-client';

import { ClientToServerEvents, ServerToClientEvents } from '../types/message';
import { Lock } from './asyncLock';

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
