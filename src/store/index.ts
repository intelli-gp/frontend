import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appApi } from './apis/appApi';
import { appReducer } from './slices/app.slice';
import { articleCreatorReducer } from './slices/article-creator.slice';
import { authReducer } from './slices/auth.slice';
import { loginFormReducer } from './slices/login-form.slice';
import { pomodoroReducer } from './slices/pomodoro.slice';
import { singupFormReducer } from './slices/signup-form.slice';

export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const reducer = combineReducers({
    pomodoro: pomodoroReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: {
        'login-form': loginFormReducer,
        'signup-form': singupFormReducer,
        'article-creator': articleCreatorReducer,
        appState: appReducer,
        auth: authReducer,
        timer: persistedReducer,
        [appApi.reducerPath]: appApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(appApi.middleware);
    },
});

setupListeners(store.dispatch);

export { store };
export * from './slices/login-form.slice';
export * from './slices/signup-form.slice';
export * from './slices/auth.slice';
export * from './slices/article-creator.slice';
export * from './slices/pomodoro.slice';
export * from './slices/app.slice';
export * from './apis';
