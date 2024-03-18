import { ChangeEvent, useEffect, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { MdLockReset } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';

import { InputWithLabel } from '../../../components/Input';
import { reset, useResetPasswordConfirmMutation } from '../../../store';
import { errorToast, successToast } from '../../../utils/toasts';
import { FormContainer, RecoveryButton,PasswordRecoveryContainer,RecoveryTitle,RecoveryHeading } from './forget-password.styles';

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
        reset();
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
        <FormContainer
            onSubmit={handleSubmit}
        >
            <RecoveryHeading>
                Recover password
            </RecoveryHeading>
            <PasswordRecoveryContainer>
                <RecoveryTitle>
                    Creating your new password
                </RecoveryTitle>
                <hr />

                <div className="flex flex-col gap-6 mt-4">
                    <InputWithLabel
                        type="password"
                        label="New password"
                        value={newPassword}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"
                        title="At least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character."
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPassword(e.target.value)
                        }
                    />
                    <InputWithLabel
                        type="password"
                        label="Confirm password"
                        value={confirmPassword}
                        error={matchError}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$"
                        title="At least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character."
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(e.target.value);
                            if (e.target.value !== newPassword) {
                                setMatchError('Passwords do not match');
                            } else {
                                setMatchError('');
                            }
                        }}
                    />
                    <RecoveryButton
                        type="submit"
                        loading={isLoading}
                    >
                        <MdLockReset />
                        Set new password
                    </RecoveryButton>
                </div>

                <Link
                    to="/auth/login"
                    className="flex flex-row gap-2 justify-center items-center text-sm mt-4"
                >
                    <IoChevronBack />
                    Back to login
                </Link>
            </PasswordRecoveryContainer>
        </FormContainer>
    );
};

export default RecoverPassword;
