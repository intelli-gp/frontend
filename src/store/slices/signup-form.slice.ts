import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    termsOfServiceAgreement: false,
};

const signupFormSlice = createSlice({
    name: 'signup-form',
    initialState,
    reducers: {
        changeSignupFirstName(state, action: PayloadAction<string>) {
            state.firstName = action.payload;
        },
        changeSignupLastName(state, action: PayloadAction<string>) {
            state.lastName = action.payload;
        },
        changeSignupUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        changeSignupEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        changeSignupPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        changeSignupBirthDate(state, action: PayloadAction<string>) {
            state.birthDate = action.payload;
        },
        changeSignupPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        changeSignupConfirmPassword(state, action: PayloadAction<string>) {
            state.confirmPassword = action.payload;
        },
        changeSignUpUserProfileImage(state, action: PayloadAction<string>) {
            state.profileImage = action.payload;
        },
        changeTermsOfServiceAgreement(state, action: PayloadAction<boolean>) {
            state.termsOfServiceAgreement = action.payload;
        },
        resetSignupForm(state) {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.phone = '';
            state.birthDate = '';
            state.password = '';
            state.confirmPassword = '';
            state.username = '';
            state.profileImage = '';
            state.termsOfServiceAgreement = false;
        },
    },
});

export const singupFormReducer = signupFormSlice.reducer;
export const {
    changeSignupBirthDate,
    changeSignupConfirmPassword,
    changeSignupUsername,
    changeSignupEmail,
    changeSignupFirstName,
    changeSignupLastName,
    changeSignupPassword,
    changeSignupPhone,
    changeSignUpUserProfileImage,
    changeTermsOfServiceAgreement,
    resetSignupForm,
} = signupFormSlice.actions;
