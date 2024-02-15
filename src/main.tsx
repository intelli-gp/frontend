import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import './index.css';
import { store } from './store';

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            duration: 5000,
                        }}
                    />
                    <App />
                </PersistGate>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
);
