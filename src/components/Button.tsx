import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { GoSync } from 'react-icons/go';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

type choice =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'primary700'
    | 'primary500';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type: ButtonType;
    select?: choice;
    rounded?: boolean;
    loading?: boolean;
    className?: string;
    outline?: boolean;
}

function Button({
    children,
    type = 'button',
    select = 'primary',
    rounded = true,
    loading = false,
    className,
    outline,
    ...rest
}: ButtonProps): JSX.Element {
    const classes = classNames(
        className,
        `focus:ring-0 focus:outline-none font-medium px-6 py-2 text-center inline-flex items-center justify-center me-2 mb-2`,
        {
            'opacity-80': loading,
            'bg-indigo-900 hover:bg-indigo-900/90 text-white':
                select === 'primary' && !outline,
            'bg-indigo-700 hover:bg-indigo-700/90 text-white':
                select === 'primary700' && !outline,
            'bg-indigo-500 hover:bg-indigo-500/90 text-white':
                select === 'primary500' && !outline,
            'bg-secondary font-bold text-txt':
                select === 'secondary' && !outline,
            'bg-green-500 hover:bg-green-500/90 text-white':
                select === 'success' && !outline,
            'bg-yellow-400 hover:bg-yellow-500/90 text-white':
                select === 'warning' && !outline,
            'bg-red-500 hover:bg-red-500/90 text-white':
                select === 'danger' && !outline,
            rounded: rounded,
            'border-2 border-indigo-900 text-indigo-900':
                outline && select === 'primary',
            'border-2 border-secondary text-secondary':
                outline && select === 'secondary',
            'border-2 border-green-500   text-green-500':
                outline && select === 'success',
            'border-2 border-yellow-400 text-yellow-400':
                outline && select === 'warning',
            'border-2 border-red-500 text-red-500':
                outline && select === 'danger',
            'border-2 border-white text-white': outline,
        },
    );

    return (
        <button disabled={loading} className={classes} type={type} {...rest}>
            {loading ? <GoSync className="animate-spin" /> : children}
        </button>
    );
}

export default Button;
