import { createSlice } from '@reduxjs/toolkit';

const signupFormSlice = createSlice({
    name: 'signup-form',
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
        termsOfServiceAgreement: false,
    },
    reducers: {
        changeSignupFirstName(state, action) {
            state.firstName = action.payload;
        },
        changeSignupLastName(state, action) {
            state.lastName = action.payload;
        },
        changeSignupEmail(state, action) {
            state.email = action.payload;
        },
        changeSignupPhone(state, action) {
            state.phone = action.payload;
        },
        changeSignupBirthDate(state, action) {
            state.birthDate = action.payload;
        },
        changeSignupPassword(state, action) {
            state.password = action.payload;
        },
        changeSignupConfirmPassword(state, action) {
            state.confirmPassword = action.payload;
        },
        changeTermsOfServiceAgreement(state, action) {
            state.termsOfServiceAgreement = action.payload;
        },
        signupFormReset(state) {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.phone = '';
            state.birthDate = '';
            state.password = '';
            state.confirmPassword = '';
            state.termsOfServiceAgreement = false;
        },
    },
});

export const singupFormReducer = signupFormSlice.reducer;
export const {
    changeSignupBirthDate,
    changeSignupConfirmPassword,
    changeSignupEmail,
    changeSignupFirstName,
    changeSignupLastName,
    changeSignupPassword,
    changeSignupPhone,
    changeTermsOfServiceAgreement,
    signupFormReset,
} = signupFormSlice.actions;
