import { createSlice } from "@reduxjs/toolkit";

const loginFormSlice = createSlice({
    name: 'login-form',
    initialState: {
        email: "",
        password: "",
        rememberMe: false,
    },
    reducers: {
        changeEmail(state, action) {
            state.email = action.payload
        },
        changePassword(state, action){
            state.password = action.payload
        },
        changeRememberMe(state, action){
            state.rememberMe = action.payload
        },
        reset(state){
            state.email = ""
            state.password = ""
            state.rememberMe = false
        }
    }
});


export const {changeEmail, changePassword, changeRememberMe, reset} = loginFormSlice.actions;
export const loginFormReducer = loginFormSlice.reducer;