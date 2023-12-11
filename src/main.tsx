import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import './index.css';

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
