import { motion } from 'framer-motion';
import _ from 'lodash';
import { ChangeEvent, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import PhoneNumberInput from '../../components/PhoneNumberInput';
import { CustomInput } from '../../components/input/Input.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    changeSignUpUserProfileImage,
    changeSignupBirthDate,
    changeSignupConfirmPassword,
    changeSignupEmail,
    changeSignupFirstName,
    changeSignupLastName,
    changeSignupPassword,
    changeSignupPhone,
    changeSignupUsername,
    changeTermsOfServiceAgreement,
    setCredentials,
    useSignUpUserMutation,
} from '../../store';
import { RootState } from '../../store/index';
import { ReceivedUser, UserToSend } from '../../types/user';
import { getSocket } from '../../utils/socket';
import { connectSSE } from '../../utils/sse';
import { errorToast } from '../../utils/toasts';
import {
    FormContainer,
    GoogleIcon,
    GoogleLoginButton,
    GoogleLoginLink,
    PasswordContainer,
    SubmitButton,
} from './auth.styles';

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        firstName,
        lastName,
        username,
        email,
        phone,
        birthDate,
        password,
        confirmPassword,
        profileImage,
        termsOfServiceAgreement,
    } = useSelector((state: RootState) => state['signup-form']);
    const [searchParams, setSearchParams] = useSearchParams();
    const [signUp, { isLoading, reset: resetMutation }] =
        useSignUpUserMutation();

    // Google oauth
    useLayoutEffect(() => {
        const user: string = searchParams.get('userData') ?? '';
        if (user) {
            setSearchParams({}, { replace: true });
            const userData: Partial<ReceivedUser> = JSON.parse(user);
            const [fname, ...lname] = userData.FullName?.split(' ') ?? [];
            dispatch(changeSignupEmail(userData.Email!));
            dispatch(
                changeSignupUsername(
                    _.kebabCase(userData.Username).replaceAll('-', '_'),
                ),
            );
            dispatch(changeSignupFirstName(fname));
            dispatch(changeSignupLastName(lname.join(' ')));
            dispatch(changeSignUpUserProfileImage(userData.ProfileImage!));
        }
    }, []);

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: Partial<UserToSend> = {
            fullName: firstName + ' ' + lastName,
            dob: birthDate,
            username,
            email,
            phoneNumber: `+${phone}`,
            password,
            image: profileImage ?? '',
        };

        try {
            const result = await signUp(user).unwrap();
            const { access_token, user: loggedInUser } = result.data;
            dispatch(
                setCredentials({ token: access_token, user: loggedInUser }),
            );
            navigate('/auth/interests');
            // Initialize socket connection.
            getSocket(access_token);
            connectSSE(access_token);
        } catch (err) {
            errorToast(JSON.stringify(err));
            console.log(err);
        } finally {
            resetMutation();
        }
    };

    return (
        <motion.div
            {...BetweenPageAnimation}
            className="flex flex-col justify-center items-center w-full lg:w-3/5 py-8"
        >
            <PageTitle className="text-center mb-6">Create Account</PageTitle>
            <FormContainer className="!gap-2 !p-0" onSubmit={handleSubmitForm}>
                <div className="flex gap-2 w-full justify-between 3xs:max-md:flex-col">
                    <CustomInput
                        required
                        label="First Name"
                        pattern="^[a-zA-Z0-9 ]{3,20}$"
                        title="Between 3 and 20 characters long, contains letters, numbers, and spaces."
                        value={firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeSignupFirstName(e.target.value));
                        }}
                    />
                    <CustomInput
                        required
                        label="Last Name"
                        pattern="^[a-zA-Z0-9 ]{3,20}$"
                        title="Between 3 and 20 characters long, contains letters, numbers, and spaces."
                        value={lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeSignupLastName(e.target.value));
                        }}
                    />
                </div>

                <CustomInput
                    required
                    label="Username"
                    pattern="^[a-z0-9_.]{3,}$"
                    title="At least 3 characters long, contains only lowercase letters, numbers, underscores, and dots."
                    type="text"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeSignupUsername(e.target.value));
                    }}
                />

                <CustomInput
                    required
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeSignupEmail(e.target.value));
                    }}
                />

                <CustomInput
                    required
                    value={birthDate}
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    label="Birth Date"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeSignupBirthDate(e.target.value));
                    }}
                />

                <PhoneNumberInput
                    value={phone}
                    onChange={(value) => {
                        dispatch(changeSignupPhone(value));
                    }}
                />

                <PasswordContainer>
                    <CustomInput
                        required
                        type="password"
                        label="Password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"
                        title="At least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character."
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeSignupPassword(e.target.value));
                        }}
                    />
                    <CustomInput
                        required
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"
                        title="At least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character."
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(
                                changeSignupConfirmPassword(e.target.value),
                            );
                        }}
                    />
                </PasswordContainer>

                <div className="flex items-center gap-2 my-4">
                    <input
                        required
                        className="accent-indigo-800 w-4 h-4"
                        type="checkbox"
                        id="terms&conditions"
                        checked={termsOfServiceAgreement}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(
                                changeTermsOfServiceAgreement(e.target.checked),
                            );
                        }}
                    />
                    <label htmlFor="terms&conditions">
                        I agree to the{' '}
                        <Link to="/terms-and-conditions">
                            Terms of Service and Privacy Policy
                        </Link>
                    </label>
                </div>

                <div className="flex flex-col gap-4">
                    <SubmitButton
                        select="primary700"
                        type="submit"
                        loading={isLoading}
                    >
                        Create
                    </SubmitButton>

                    <GoogleLoginButton>
                        <GoogleLoginLink
                            href={`${
                                import.meta.env.VITE_BACKEND
                            }/api/auth/login/google`}
                        >
                            <GoogleIcon />
                            Sign up with google
                        </GoogleLoginLink>
                    </GoogleLoginButton>
                </div>

                <p className="flex gap-2 justify-center my-3">
                    Already has an account?
                    <Link to="/auth/login">Login</Link>
                </p>
            </FormContainer>
        </motion.div>
    );
}
