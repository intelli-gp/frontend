import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from './apis/userApi';
import { loginFormReducer } from './slices/login-form';
import { singupFormReducer } from './slices/signup-form';
import { checkAuthenticated } from './middlewares/checkAuthenticated';
import { authReducer } from './slices/auth';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        'login-form': loginFormReducer,
        'signup-form': singupFormReducer,
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(checkAuthenticated);
    },
});

setupListeners(store.dispatch);

export { store };
export * from './slices/login-form';
export * from './slices/signup-form';
export * from './slices/auth';
export {
    useFetchUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
} from './apis/userApi';

// for dev purposes
(window as any).store = store;
