import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';

import { CustomInput } from '../../../components/input/Input.component';
import { BetweenPageAnimation, PageTitle } from '../../../index.styles';
import { useLazyResetPasswordQuery } from '../../../store';
import { errorToast, successToast } from '../../../utils/toasts';
import {
    BackToLoginLink,
    RecoveryButton,
    RecoveryMessage,
    RecoveryTitle,
} from './forget-password.styles';

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

    useEffect(() => {
        document.title = 'Forget Password | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword(email);
    };

    return (
        <motion.form
            {...BetweenPageAnimation}
            className="flex flex-col gap-4 3xs:w-[20rem] md:!w-[25rem] py-8"
            onSubmit={handleSubmit}
        >
            <PageTitle className="text-center mb-6">Forget password</PageTitle>
            <main className="flex flex-col border rounded-md p-8 gap-2 border-slate-300">
                <RecoveryTitle>Recover your password</RecoveryTitle>
                <hr />
                <RecoveryMessage>
                    Don't worry, happens to the best of us.
                </RecoveryMessage>

                <div className="flex flex-col gap-6 mt-6">
                    <CustomInput
                        required
                        type="email"
                        label="Your Email (Must be registered)"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <RecoveryButton type="submit" loading={isFetching}>
                        <FaEnvelope />
                        Email me a recovery link
                    </RecoveryButton>
                </div>

                <BackToLoginLink to="/auth/login">
                    <IoChevronBack />
                    Back to login
                </BackToLoginLink>
            </main>
        </motion.form>
    );
}
