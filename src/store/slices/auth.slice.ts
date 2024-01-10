import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/user';

type StoredCredentials = {
    token: string;
    user: Readonly<Partial<User>>;
    isAuthenticated?: boolean;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isAuthenticated: false,
        user: {},
    },
    reducers: {
        setCredentials(state, action: PayloadAction<StoredCredentials>) {
            const { user, token } = action.payload;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(user));
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
        },
        clearCredentials(state) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            state.token = '';
            state.user = {};
            state.isAuthenticated = false;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setCredentials, clearCredentials } = authSlice.actions;
