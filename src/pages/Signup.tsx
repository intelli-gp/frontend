import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import Button from '../components/Button';
import Input from '../components/Input';
import RegionInput from '../components/RegionInput';

export default function SignupPage() {
    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    // const [phone, setPhone] = useState<string>('');
    const [bdate, setBdate] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');
    const [terms, setTerms] = useState<boolean>(false);

    return (
        <div className="flex flex-col justify-center items-center w-3/5">
            <form className="flex flex-col gap-4 w-[25rem]">
                <h1 className="text-5xl text-neutral-600 font-black text-center py-10">
                    Create Account
                </h1>

                <div className="flex gap-2 w-full justify-between">
                    <Input
                        label="First Name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <Input
                        label="Last Name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>

                <Input
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    value={bdate}
                    type="date"
                    label="Birth Date"
                    onChange={(e) => {
                        setBdate(e.target.value);
                    }}
                />
                <RegionInput />
                <div className="flex gap-2 w-full justify-between">
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        className="accent-indigo-800 w-4 h-4"
                        type="checkbox"
                        id="terms&conditions"
                        checked={terms}
                        onChange={(e) => {
                            setTerms(e.target.checked);
                        }}
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
                    type="submit"
                    className="flex items-center justify-center gap-2 text-lg h-auto py-2 w-full"
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
