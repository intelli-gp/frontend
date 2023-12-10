import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MdLockReset } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import { useResetPasswordConfirmMutation } from '../../store';
import { IoChevronBack } from 'react-icons/io5';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const RecoverPassword = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [matchError, setMatchError] = useState<string>('');
    const [searchParams] = useSearchParams();
    const [resetPassword, { isLoading, isSuccess, isError, error }] =
        useResetPasswordConfirmMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let token = searchParams.get('token');
        let email = searchParams.get('email');
        await resetPassword({
            email,
            token,
            password: newPassword,
        }).unwrap();
    };

    return (
        <form
            className="flex flex-col gap-4 w-[25rem] py-8"
            onSubmit={handleSubmit}
        >
            <h1 className="text-5xl text-neutral-600 font-black text-center py-10 tracking-tight">
                Recover password
            </h1>

            <main className="flex flex-col border rounded-md p-8 gap-2 border-slate-300">
                <h2 className="text-2xl font-bold text-neutral-600">
                    Creating you new password
                </h2>
                <hr />

                <div className="flex flex-col gap-6 mt-4">
                    <Input
                        type="password"
                        label="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        label="Confirm password"
                        value={confirmPassword}
                        error={matchError}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (e.target.value !== newPassword) {
                                setMatchError('Passwords do not match');
                            } else {
                                setMatchError('');
                            }
                        }}
                    />
                    <Button
                        className="h-auto text-md text-center font-bold w-full gap-2"
                        type="submit"
                        loading={isLoading}
                        rounded
                    >
                        <MdLockReset />
                        Set new password
                    </Button>
                </div>

                {isError && (
                    <p className="text-sm text-red-600 text-center font-bold">
                        {(error as FetchBaseQueryError).status === 400 &&
                            `This link has expired.`}
                    </p>
                )}

                {isSuccess && (
                    <p className="text-sm text-green-600 text-center font-bold">
                        Your password has been reset successfully.
                    </p>
                )}

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
};

export default RecoverPassword;
