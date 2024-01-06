import React, { ChangeEvent, useEffect, useLayoutEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../components/Button';
import { InputWithLabel } from '../../components/Input';
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
import { errorToast } from '../../utils/toasts';

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
    const [loginUser, { isLoading, isError }] = useLoginUserMutation();

    useEffect(() => {
        if (isError) {
            errorToast('Invalid email or password.');
        }
    }, [isError]);

    // Redirect to app page if user is already logged in
    useLayoutEffect(() => {
        if (isAuthenticated) {
            navigate('/app');
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
            } else {
                console.log(
                    'The response for login request has returned with this data: ',
                    data,
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form
            className="flex flex-col gap-4 3xs:w-[20rem] md:!w-[25rem]"
            onSubmit={handleSubmitLogin}
        >
            <h1 className="text-5xl 3xs:max-md:text-[2.5rem] text-slate-600 font-black text-center py-10 tracking-tight">
                Welcome Back!
            </h1>

            <InputWithLabel
                required
                type="email"
                value={email}
                label="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(changeEmail(e.target.value))
                }
            />

            <InputWithLabel
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

            <Button
                type="button"
                className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
            >
                <a
                    href="http://localhost:3333/api/auth/login/google"
                    className="flex items-center justify-center gap-2 text-white"
                >
                    <FcGoogle className="p-[1px] rounded-full bg-white box-content" />
                    Login with google
                </a>
            </Button>

            <p className="flex gap-2 justify-center">
                Don't have an account?
                <Link to="/auth/signup">Create one</Link>
            </p>
        </form>
    );
}
