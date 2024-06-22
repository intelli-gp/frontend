import { motion } from 'framer-motion';
import React, {
    ChangeEvent,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '../../components/button/button.component';
import { CustomInput } from '../../components/input/Input.component';
import { Modal, ModalProps } from '../../components/modal/modal.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeEmail,
    changePassword,
    changeRememberMe,
    reset as resetLoginForm,
    setCredentials,
    useAuthenticate2faMutation,
    useLoginUserMutation,
} from '../../store';
import { store } from '../../store';
import { routingHelper } from '../../utils/navigateHelper';
import { getSocket } from '../../utils/socket';
import { connectSSE } from '../../utils/sse';
import { errorToast } from '../../utils/toasts';
import { QRCodeModalButtons, QRCodeText } from '../settings/settings.styles';
import { GoogleIcon, GoogleLoginButton, GoogleLoginLink } from './auth.styles';

const TwoFactorModal = ({
    isOpen,
    setIsOpen,
}: Pick<ModalProps, 'isOpen' | 'setIsOpen'>) => {
    const dispatch = useDispatch();

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    const { user: storedUser } = useSelector((state: RootState) => state.auth);

    const [trigger2faAuthentication, { isLoading: is2faAuthenticating }] =
        useAuthenticate2faMutation();

    const handle2faAuthentication = async (otp: string) => {
        try {
            const res = await trigger2faAuthentication(otp).unwrap();
            const { access_token } = res.data;
            dispatch(setCredentials({ token: access_token, user: storedUser }));
            getIntoTheApp(access_token);
        } catch (error) {
            errorToast('Invalid 2FA code');
            console.error(error);
        }
    };

    const handle2faAuthenticationWithValidation = async () => {
        if (otp.length !== 6 || isNaN(Number(otp))) {
            setOtpError('Please enter a valid six-digit code');
        } else {
            handle2faAuthentication(otp);
        }
    };

    return (
        <Modal title="Two Factor Code Required" isOpen={isOpen} setIsOpen={setIsOpen}>
            <QRCodeText>
                Enter the six-digit code from your <br />
                <strong> Authenticator app</strong>
            </QRCodeText>
            <CustomInput
                label={'Six-digit code'}
                Placeholder={'- - - - - -'}
                value={otp}
                error={otpError}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOtp(e.target.value)
                }
            />
            <QRCodeModalButtons>
                <Button
                    onClick={handle2faAuthenticationWithValidation}
                    loading={is2faAuthenticating}
                    className="w-[100px] h-[36px]"
                >
                    Continue
                </Button>
            </QRCodeModalButtons>
        </Modal>
    );
};

export default function LoginPage() {
    const dispatch = useDispatch();

    const [twoFactorIsOpen, setTwoFactorIsOpen] = useState(false);

    const { user: storedUser, token } = useSelector(
        (state: RootState) => state.auth,
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const { email, password, rememberMe, isAuthenticated } = useSelector(
        (state: RootState) => {
            return {
                ...state['login-form'],
                ...state['auth'],
            };
        },
    );
    const [loginUser, { isLoading }] = useLoginUserMutation();

    useLayoutEffect(() => {
        document.title = 'Login | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    // Redirect to app page if user is already logged in
    useLayoutEffect(() => {
        if (isAuthenticated) {
            console.log('Google Auth useEffect');
            if (storedUser.TwoFactorAuthEnabled) {
                setTwoFactorIsOpen(true);
            } else {
                getIntoTheApp(token);
            }
        }
    }, []);

    // Google oauth
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            console.log('Google Auth useEffect');
            const user = JSON.parse(searchParams.get('user') as string);
            setSearchParams({}, { replace: true });
            dispatch(
                setCredentials({
                    token,
                    user,
                }),
            );
            if (user.TwoFactorAuthEnabled) {
                setTwoFactorIsOpen(true);
            } else {
                getIntoTheApp(token);
            }
        }
    }, []);

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({
                email,
                password,
            }).unwrap();
            dispatch(
                setCredentials({
                    token: data.access_token,
                    user: data.user,
                }),
            );
            if (data.user.TwoFactorAuthEnabled) {
                setTwoFactorIsOpen(true);
            } else {
                getIntoTheApp(data.access_token);
            }
        } catch (err) {
            errorToast('Invalid email or password.');
            console.error(err);
        }
    };

    return (
        <motion.form
            {...BetweenPageAnimation}
            className="flex flex-col gap-[0.75rem] 3xs:w-[20rem] md:!w-[25rem]"
            onSubmit={handleSubmitLogin}
        >
            <PageTitle size="lg" className="text-center mb-6">
                Welcome Back!
            </PageTitle>

            <CustomInput
                required
                type="email"
                value={email}
                label="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(changeEmail(e.target.value))
                }
            />

            <CustomInput
                required
                type="password"
                value={password}
                label="Password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(changePassword(e.target.value))
                }
            />

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <input
                        className="w-4 accent-indigo-800"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => {
                            dispatch(changeRememberMe(e.target.checked));
                        }}
                    />
                    <label htmlFor="rememberMe">Remember me.</label>
                </div>
                <Link to="/auth/forget-password">Forget your password?</Link>
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    select="primary700"
                    type="submit"
                    className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
                    loading={isLoading}
                >
                    Login
                </Button>

                <GoogleLoginButton>
                    <GoogleLoginLink href={`${import.meta.env.VITE_BACKEND}/api/auth/login/google`}>
                        <GoogleIcon />
                        Login with google
                    </GoogleLoginLink>
                </GoogleLoginButton>
            </div>

            <p className="flex gap-2 justify-center">
                Don't have an account?
                <Link to="/auth/signup">Create one</Link>
            </p>

            {/* Modals */}
            <TwoFactorModal
                isOpen={twoFactorIsOpen}
                setIsOpen={setTwoFactorIsOpen}
            />
        </motion.form>
    );
}

// Helper function
const getIntoTheApp = (token: string) => {
    routingHelper.navigate('/app/search');
    store.dispatch(resetLoginForm());

    // Initialize socket and sse connection.
    getSocket(token);
    connectSSE(token);
};
