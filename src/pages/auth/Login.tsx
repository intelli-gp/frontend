import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { RootState } from '../../store';
import {
    changeEmail,
    changePassword,
    changeRememberMe,
    useLoginUserMutation,
    setCredentials,
    reset,
} from '../../store';
import { Response } from '../../types/response';

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

    // Redirect to logged-in page if user is already logged in
    useEffect(() => {
        if (isAuthenticated) {
            console.log(isAuthenticated);
            navigate('/logged-in');
        }
    }, [isAuthenticated]);

    // Google oauth
    useEffect(() => {
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
            className="flex flex-col gap-4 w-[25rem]"
            onSubmit={handleSubmitLogin}
        >
            <h1 className="text-5xl text-neutral-600 font-black text-center py-10 tracking-tight">
                Welcome Back!
            </h1>

            <Input
                required
                type="email"
                value={email}
                label="Email"
                onChange={(e) => dispatch(changeEmail(e.target.value))}
            />

            <Input
                required
                type="password"
                value={password}
                label="Password"
                onChange={(e) => dispatch(changePassword(e.target.value))}
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
                className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
                loading={isLoading}
            >
                Login
            </Button>

            <Button
                type="button"
                className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
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
