import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import  { ChangeEvent, useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { InputWithLabel } from '../../../components/Input';
import { useLazyResetPasswordQuery } from '../../../store';
import { errorToast, successToast } from '../../../utils/toasts';
import { BackToLoginLink, FormContainer, PasswordRecoveryContainer, RecoveryHeading, RecoveryMessage, RecoveryTitle, RecoveryButton } from './forget-password.styles';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState<string>('');

    const [resetPassword, { isFetching, isSuccess, isError, error }] =
        useLazyResetPasswordQuery();

    useEffect(() => {
        if (isSuccess) {
            successToast('An email has been sent.');
        } else if (isError) {
            let errorMessage = 'Error occurred';
            switch ((error as FetchBaseQueryError).status) {
                case 404:
                    errorMessage = 'This email is not registered.';
                    break;
                case 500:
                    errorMessage = 'Error from server side, try again later.';
                    break;
            }
            errorToast(errorMessage);
        }
    }, [isError, isSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword(email);
    };

    return (
        <FormContainer
            onSubmit={handleSubmit}
        >
            <RecoveryHeading>
                Forget password
            </RecoveryHeading>
            <PasswordRecoveryContainer>
                <RecoveryTitle>
                    Recover your password
                </RecoveryTitle>
                <hr />
                <RecoveryMessage>
                    Don't worry, happens to the best of us.
                </RecoveryMessage>

                <div className="flex flex-col gap-6 mt-6">
                    <InputWithLabel
                        required
                        type="email"
                        label="Your Email (Must be registered)"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <RecoveryButton
                        type="submit"
                        loading={isFetching}
                    >
                        <FaEnvelope />
                        Email me a recovery link
                    </RecoveryButton>
                </div>

                <BackToLoginLink
                    to="/auth/login"
                >
                    <IoChevronBack />
                    Back to login
                </BackToLoginLink>
            </PasswordRecoveryContainer>
        </FormContainer>
    );
}

