import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isAuthenticated: false,
    },
    reducers: {
        setToken(state, action) {
            window.localStorage.setItem('token', action.payload);
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        resetToken(state) {
            window.localStorage.removeItem('token');
            state.token = '';
            state.isAuthenticated = false;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setToken, resetToken } = authSlice.actions;
