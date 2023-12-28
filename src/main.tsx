import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import "react-big-calendar/lib/css/react-big-calendar.css";

import App from './App.tsx';
import './index.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 5000,
                    }}
                />
                <App />
            </Provider>
        </HashRouter>
    </React.StrictMode>,
);
