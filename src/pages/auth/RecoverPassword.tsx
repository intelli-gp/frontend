import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MdLockReset } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordConfirmMutation } from '../../store';

const RecoverPassword = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [matchError, setMatchError] = useState<string>('');
    const [searchParams] = useSearchParams();
    const [resetPassword, { isLoading }] = useResetPasswordConfirmMutation();

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

            <div className="flex flex-col border rounded-md py-4 px-8 gap-2 border-slate-300">
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
            </div>
        </form>
    );
};

export default RecoverPassword;
