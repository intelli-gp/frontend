import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import Button from '../components/Button';
import Input from '../components/Input';
import { RootState } from '../store';
import { changeEmail, changePassword, changeRememberMe, reset } from '../store';

export default function LoginPage() {
    const dispatch = useDispatch();
    const {email, password, rememberMe} = useSelector((state : RootState) => state['login-form']);


    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(reset())
        console.log(email, password, rememberMe)
    };

    const handleGoogleLoginClick = (e:  React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(reset())
    };

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
                    dispatch(changeEmail((e.target.value)))
                }}
            />

            <Input
                type="password"
                value={password}
                label="Password"
                onChange={(e) => {
                    dispatch(changePassword(e.target.value));
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
                onClick={handleLoginClick}
                className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
            >
                Login
            </Button>

            <Button
                type="submit"
                onClick={handleGoogleLoginClick}
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
