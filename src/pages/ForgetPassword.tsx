import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState<string>('');

    return (
        <form className="flex flex-col gap-4 w-[25rem] py-8">
            <h1 className="text-5xl text-neutral-600 font-black text-center py-10">
                Forget password?
            </h1>
            <div className="flex flex-col border rounded-md py-4 px-8 gap-2 border-slate-300">
                <h2 className="text-2xl font-bold text-neutral-600">
                    Recover your password
                </h2>
                <hr />
                <p className="text-sm text-neutral-500">
                    Don't worry, happens to the best of us.
                </p>

                <div className="flex flex-col gap-6 mt-8">
                    <Input
                        type="email"
                        label="Your Email (Must be registered)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        className="h-auto text-md text-center font-bold w-full gap-2"
                        type="submit"
                        rounded
                    >
                        <FaEnvelope />
                        Email me a recovery link
                    </Button>
                </div>
            </div>
        </form>
    );
}
