import { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useLazyResetPasswordQuery } from '../../store';
import { errorToast, successToast } from '../../utils/toasts';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState<string>('');

    const [trigger, { isFetching, isSuccess, isError, error }] =
        useLazyResetPasswordQuery();

    useEffect(() => {
        if (isSuccess) {
            successToast('An email has been sent.');
        }
        if (isError) {
            errorToast(JSON.stringify(error));
        }
    }, [isError, isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await trigger(email).unwrap();
    };

    return (
        <form
            className="flex flex-col gap-4 w-[25rem] py-8"
            onSubmit={handleSubmit}
        >
            <h1 className="text-5xl text-neutral-600 font-black text-center py-8 tracking-tight">
                Forget password
            </h1>
            <main className="flex flex-col border rounded-md p-8 gap-2 border-slate-300">
                <h2 className="text-2xl font-bold text-neutral-600">
                    Recover your password
                </h2>
                <hr />
                <p className="text-sm text-neutral-500">
                    Don't worry, happens to the best of us.
                </p>

                <div className="flex flex-col gap-6 mt-6">
                    <Input
                        required
                        type="email"
                        label="Your Email (Must be registered)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        className="h-auto text-md text-center font-bold w-full gap-2"
                        type="submit"
                        rounded
                        loading={isFetching}
                    >
                        <FaEnvelope />
                        Email me a recovery link
                    </Button>
                </div>

                <Link
                    to="/auth/login"
                    className="flex flex-row gap-2 justify-center items-center text-sm mt-4"
                >
                    <IoChevronBack />
                    Back to login
                </Link>
            </main>
        </form>
    );
}
