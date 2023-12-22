import { useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { MdLockReset } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { reset, useResetPasswordConfirmMutation } from '../../store';
import { errorToast, successToast } from '../../utils/toasts';

const RecoverPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matchError, setMatchError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [
        resetPassword,
        { isLoading, isSuccess, isError, reset: resetMutation },
    ] = useResetPasswordConfirmMutation();

    useEffect(() => {
        if (isSuccess) {
            successToast(
                'Your password has been reset.\nPlease login again using the new password.',
            );
            setSearchParams({}, { replace: true });
            setNewPassword('');
            setConfirmPassword('');
        } else if (isError) {
            errorToast('An error occurred. Please try again.');
        }
        resetMutation();
    }, [isError, isSuccess]);

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
