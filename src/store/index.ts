import { configureStore } from '@reduxjs/toolkit';
import { loginFormReducer } from './slices/login-form';
import { singupFormReducer } from './slices/signup-form';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        'login-form': loginFormReducer,
        'signup-form': singupFormReducer,
    },
});

export { store };
export * from './slices/login-form';
export * from './slices/signup-form';
