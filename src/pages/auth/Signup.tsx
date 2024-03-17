import { ChangeEvent, useLayoutEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { InputWithLabel } from '../../components/Input';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import Button from '../../components/button/button.component';
import { PageTitle } from '../../index.styles';
import {
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
import { UserToSend } from '../../types/user';
import { getSocket } from '../../utils/socket';
import { connectSSE } from '../../utils/sse';
import { errorToast } from '../../utils/toasts';

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
        termsOfServiceAgreement,
    } = useSelector((state: RootState) => state['signup-form']);
    const [searchParams, setSearchParams] = useSearchParams();
    const [signUp, { isLoading, reset: resetMutation }] =
        useSignUpUserMutation();

    // Google oauth
    useLayoutEffect(() => {
        const user = searchParams.get('userData');
        if (user) {
            setSearchParams({}, { replace: true });
            const userData = JSON.parse(user);
            const [fname, ...lname] = userData.full_name.split(' ');
            dispatch(changeSignupEmail(userData.email));
            dispatch(changeSignupUsername(userData.username));
            dispatch(changeSignupFirstName(fname));
            dispatch(changeSignupLastName(lname.join(' ')));
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
            resetMutation();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-3/5 py-8">
            <PageTitle className="text-center mb-6">Create Account</PageTitle>

            <form
                className="flex flex-col gap-2 3xs:w-[20rem] md:!w-[25rem]"
                onSubmit={handleSubmitForm}
            >
                <div className="flex gap-2 w-full justify-between 3xs:max-md:flex-col">
                    <InputWithLabel
                        required
                        label="First Name"
                        pattern="^[a-zA-Z0-9 ]{3,20}$"
                        title="Between 3 and 20 characters long, contains letters, numbers, and spaces."
                        value={firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeSignupFirstName(e.target.value));
                        }}
                    />
                    <InputWithLabel
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

                <InputWithLabel
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

                <InputWithLabel
                    required
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeSignupEmail(e.target.value));
                    }}
                />

                <InputWithLabel
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

                <div className="flex gap-2 w-full justify-between 3xs:max-md:flex-col">
                    <InputWithLabel
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
                    <InputWithLabel
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
                </div>

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
                    <Button
                        select="primary700"
                        type="submit"
                        className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
                        loading={isLoading}
                    >
                        Create
                    </Button>

                    <Button
                        type="button"
                        className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BACKEND
                            }/api/auth/login/google`}
                            className="flex items-center justify-center gap-2 text-white"
                        >
                            <FcGoogle className="p-[1px] rounded-full bg-white box-content" />
                            Sign up with google
                        </a>
                    </Button>
                </div>

                <p className="flex gap-2 justify-center my-3">
                    Already has an account?
                    <Link to="/auth/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
