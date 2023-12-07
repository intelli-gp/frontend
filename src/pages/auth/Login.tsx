import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const { email, password, rememberMe } = useSelector(
        (state: RootState) => state['login-form'],
    );

    const [loginUser, { isLoading }] = useLoginUserMutation();

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
                navigate('/logged-in');
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
            <h1 className="text-5xl text-neutral-600 font-black text-center py-10">
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
                className="flex items-center justify-center gap-2 text-lg h-12 w-full"
                loading={isLoading}
            >
                Login
            </Button>

            <Button type="button" className=" text-lg h-12 w-full">
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
