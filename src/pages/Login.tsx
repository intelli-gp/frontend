import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import Button from '../components/Button';
import Input from '../components/Input';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // const handleLoginClick = () => {};

    // const handleGoogleLoginClick = () => {};

    return (
        <form className="flex flex-col gap-4 w-[25rem]">
            <h1 className="text-5xl text-neutral-600 font-black text-center py-10">
                Welcome Back!
            </h1>

            <Input
                type="email"
                value={email}
                label="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />

            <Input
                type="password"
                value={password}
                label="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <input
                        className="w-4 accent-indigo-800"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => {
                            setRememberMe(e.target.checked);
                        }}
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
