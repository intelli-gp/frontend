import { PayloadAction, Store, createSlice } from '@reduxjs/toolkit';

import { ReceivedUser } from '../../types/user';

type StoredCredentials = {
    token: string;
    user: Readonly<Partial<ReceivedUser>>;
    isAuthenticated?: boolean;
};

let initialState: StoredCredentials = {
    token: '',
    isAuthenticated: false,
    user: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<StoredCredentials>) {
            const { user, token } = action.payload;
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        clearCredentials(state) {
            state.token = '';
            state.user = {};
            state.isAuthenticated = false;
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setCredentials, clearCredentials } = authSlice.actions;
