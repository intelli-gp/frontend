import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { InputWithLabel } from '../../components/Input';
import Button from '../../components/button/button.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { useLazyResetPasswordQuery } from '../../store';
import { errorToast, successToast } from '../../utils/toasts';

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
        <motion.form
            {...BetweenPageAnimation}
            className="flex flex-col gap-4 3xs:w-[20rem] md:!w-[25rem] py-8"
            onSubmit={handleSubmit}
        >
            <PageTitle className="text-center mb-6">Forget password</PageTitle>
            <main className="flex flex-col border rounded-md p-8 gap-2 border-slate-300">
                <h2 className="text-2xl font-bold text-slate-600">
                    Recover your password
                </h2>
                <hr />
                <p className="text-sm text-slate-500">
                    Don't worry, happens to the best of us.
                </p>

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
                    <Button
                        className="!h-11 text-base text-center !font-bold w-full gap-2"
                        type="submit"
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
        </motion.form>
    );
}
