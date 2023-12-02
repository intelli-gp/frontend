import { configureStore } from "@reduxjs/toolkit";
import { loginFormReducer} from './slices/login-form';

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
    reducer: {
        'login-form' : loginFormReducer,
    }
});

export {store}
export * from './slices/login-form'