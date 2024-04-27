import { motion } from 'framer-motion';
import React, { ChangeEvent, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../components/button/button.component';
import { CustomInput } from '../../components/input/Input.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeEmail,
    changePassword,
    changeRememberMe,
    reset,
    setCredentials,
    useLoginUserMutation,
} from '../../store';
import { Response } from '../../types/response';
import { getSocket } from '../../utils/socket';
import { connectSSE } from '../../utils/sse';
import { errorToast } from '../../utils/toasts';
import { GoogleIcon, GoogleLoginButton, GoogleLoginLink } from './auth.styles';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { email, password, rememberMe, isAuthenticated } = useSelector(
        (state: RootState) => {
            return {
                ...state['login-form'],
                ...state['auth'],
            };
        },
    );
    const [loginUser, { isLoading }] = useLoginUserMutation();

    // Redirect to app page if user is already logged in
    useLayoutEffect(() => {
        if (isAuthenticated) {
            navigate('/app/search');
        }
    }, [isAuthenticated]);

    // Google oauth
    useLayoutEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            const user = JSON.parse(searchParams.get('user') as string);
            setSearchParams({}, { replace: true });
            dispatch(
                setCredentials({
                    token,
                    user,
                }),
            );
            navigate('/app/study-planner');
            // Initialize socket connection.
            getSocket(token);
            connectSSE(token);
        }
    }, []);

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data }: Response = await loginUser({
                email,
                password,
            }).unwrap();
            if (data && data.access_token) {
                dispatch(
                    setCredentials({
                        token: data.access_token,
                        user: data.user,
                    }),
                );
                navigate('/app/study-planner');
                dispatch(reset());
                // Initialize socket connection.
                getSocket(data.access_token);
                connectSSE(data.access_token);
            } else {
                console.log(
                    'The response for login request has returned with this data: ',
                    data,
                );
            }
        } catch (err) {
            errorToast('Invalid email or password.');
            console.error(err);
        }
    };

    return (
        <motion.form
            {...BetweenPageAnimation}
            className="flex flex-col gap-4 3xs:w-[20rem] md:!w-[25rem]"
            onSubmit={handleSubmitLogin}
        >
            <PageTitle className="text-center mb-6">Welcome Back!</PageTitle>

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

            <Button
                select="primary700"
                type="submit"
                className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
                loading={isLoading}
            >
                Login
            </Button>

            <GoogleLoginButton>
                <GoogleLoginLink href="http://localhost:3333/api/auth/login/google">
                    <GoogleIcon />
                    Login with google
                </GoogleLoginLink>
            </GoogleLoginButton>

            <p className="flex gap-2 justify-center">
                Don't have an account?
                <Link to="/auth/signup">Create one</Link>
            </p>
        </motion.form>
    );
}
