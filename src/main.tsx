import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import './index.css';
import { setCredentials, store } from './store';
import { getSocket } from './utils/socket.ts';
import { connectSSE } from './utils/sse.ts';

let persistor = persistStore(store);

let savedToken = window.localStorage.getItem('token');
let savedUser = window.localStorage.getItem('user');
if (savedToken) {
    store.dispatch(
        setCredentials({
            token: savedToken,
            user: JSON.parse(savedUser as string),
        }),
    );
    // Connect to the socket and the server sent events `Notifications`.
    getSocket(savedToken);
    connectSSE(savedToken);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Toaster
                        toastOptions={{
                            duration: 3000,
                        }}
                    />
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
