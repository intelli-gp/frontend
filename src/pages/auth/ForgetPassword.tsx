import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FaEnvelope } from 'react-icons/fa';
import { useLazyResetPasswordQuery } from '../../store';
import { Response } from '../../types/response';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState<string>('');

    const [trigger, { isError, error, isSuccess, isFetching }] =
        useLazyResetPasswordQuery();

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
            <main className="flex flex-col border rounded-md py-8 px-8 gap-2 border-slate-300">
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

                {isError && (
                    <p className="text-sm text-red-500 text-center">
                        {(error as Response).data}
                    </p>
                )}

                {isSuccess && (
                    <p className="text-sm text-green-600 text-center font-bold">
                        An email has been sent.
                    </p>
                )}
            </main>
        </form>
    );
}
