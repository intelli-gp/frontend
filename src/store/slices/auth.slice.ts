import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isAuthenticated: false,
        user: {},
    },
    reducers: {
        setCredentials(state, action) {
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
