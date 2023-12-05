import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import {
    signupFormReset,
    changeSignupBirthDate,
    changeSignupConfirmPassword,
    changeSignupEmail,
    changeSignupFirstName,
    changeSignupLastName,
    changeSignupPassword,
    changeSignupPhone,
    changeTermsOfServiceAgreement,
} from '../store';
import { useAddUserMutation } from '../store';

import Button from '../components/Button';
import Input from '../components/Input';
import PhoneNumberInput from '../components/PhoneNumberInput';
import { RootState } from '../store/index';

export default function SignupPage() {
    const dispatch = useDispatch();
    const {
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        password,
        confirmPassword,
        termsOfServiceAgreement,
    } = useSelector((state: RootState) => state['signup-form']);
    const [addUser, addUserResult] = useAddUserMutation();

    const handleCreateAccountWithGoogle = async () => {
        // TODO: Handle create account
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            phone,
            birthDate,
            password,
            confirmPassword,
        };

        addUser(user)
            .unwrap()
            .then(() => {
                console.log(addUserResult);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-3/5 py-8">
            <form
                className="flex flex-col gap-4 w-[25rem]"
                onSubmit={handleSubmitForm}
            >
                <h1 className="text-5xl text-neutral-600 font-black text-center py-10">
                    Create Account
                </h1>

                <div className="flex gap-2 w-full justify-between">
                    <Input
                        required
                        label="First Name"
                        value={firstName}
                        onChange={(e) =>
                            dispatch(changeSignupFirstName(e.target.value))
                        }
                    />
                    <Input
                        required
                        label="Last Name"
                        value={lastName}
                        onChange={(e) =>
                            dispatch(changeSignupLastName(e.target.value))
                        }
                    />
                </div>

                <Input
                    required
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                        dispatch(changeSignupEmail(e.target.value))
                    }
                />

                <Input
                    required
                    value={birthDate}
                    type="date"
                    label="Birth Date"
                    onChange={(e) =>
                        dispatch(changeSignupBirthDate(e.target.value))
                    }
                />

                <PhoneNumberInput
                    value={phone}
                    onChange={(e) =>
                        dispatch(changeSignupPhone(e.target.value))
                    }
                />

                <div className="flex gap-2 w-full justify-between">
                    <Input
                        required
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) =>
                            dispatch(changeSignupPassword(e.target.value))
                        }
                    />
                    <Input
                        required
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            dispatch(
                                changeSignupConfirmPassword(e.target.value),
                            )
                        }
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        required
                        className="accent-indigo-800 w-4 h-4"
                        type="checkbox"
                        id="terms&conditions"
                        checked={termsOfServiceAgreement}
                        onChange={(e) =>
                            dispatch(
                                changeTermsOfServiceAgreement(e.target.checked),
                            )
                        }
                    />
                    <label htmlFor="terms&conditions">
                        I agree to the{' '}
                        <Link to="/terms-and-conditions">
                            Terms of Service and Privacy Policy
                        </Link>
                    </label>
                </div>

                <Button
                    select="primary700"
                    type="submit"
                    className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
                >
                    Create
                </Button>

                <Button
                    type="button"
                    className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
                    onClick={handleCreateAccountWithGoogle}
                >
                    <FcGoogle />
                    Sign up with google
                </Button>

                <p className="flex gap-2 justify-center my-3">
                    Already has an account?
                    <Link to="/auth/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
