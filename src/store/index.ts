import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appApi } from './apis/appApi';
import { loginFormReducer } from './slices/login-form.slice';
import { singupFormReducer } from './slices/signup-form.slice';
import { authReducer } from './slices/auth.slice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        'login-form': loginFormReducer,
        'signup-form': singupFormReducer,
        auth: authReducer,
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
export {
    useFetchUserQuery,
    useSignUpMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
} from './apis';
