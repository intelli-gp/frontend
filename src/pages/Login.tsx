import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import Button from '../components/Button';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // const handleLoginClick = () => {};

    // const handleGoogleLoginClick = () => {};

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    return (
        <form className="flex flex-col gap-4 w-[25rem]">
            <h1 className="text-5xl text-neutral-600 font-black text-center py-10">
                Welcome Back!
            </h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                    Email:
                </label>
                <input
                    className="rounded border border-slate-500 p-2"
                    type="email"
                    placeholder="email"
                    id="email"
                    value={email}
                    onChange={onEmailChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-bold">
                    Password:
                </label>
                <input
                    className="rounded border border-slate-500 p-2"
                    type="password"
                    placeholder="password"
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <input
                        className="w-4 accent-indigo-800"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={onRememberMeChange}
                    />
                    <label htmlFor="rememberMe">Remember me.</label>
                </div>
                <Link to="./forget-password">Forget your password?</Link>
            </div>
            <Button
                select="primary700"
                type="submit"
                className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
            >
                Login
            </Button>
            <Button
                type="submit"
                className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
            >
                <FcGoogle />
                Login with google
            </Button>
            <p className="flex gap-2 justify-center">
                Don't have an account?
                <Link to="/auth/signup">Create one</Link>
            </p>
        </form>
    );
}
