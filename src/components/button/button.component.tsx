import React, { ButtonHTMLAttributes } from 'react';

import { ButtonContainer, ButtonIcon } from './button.style';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type Choice =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'primary700'
    | 'primary500'
    | 'primary300'
    | 'primary200'
    | 'primary100';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        Record<string, unknown> {
    children: React.ReactNode;
    type?: ButtonType;
    select?: Choice;
    rounded?: boolean;
    loading?: boolean;
    className?: string;
    outline?: boolean;
}

function Button({
    children,
    type = 'button',
    select = 'primary',
    rounded = false,
    loading = false,
    className,
    outline,
    ...rest
}: ButtonProps): JSX.Element {
    return (
        <ButtonContainer
            loading={loading}
            select={select}
            rounded={rounded}
            outline={outline}
            className={className}
            type={type}
            {...rest}
        >
            {loading ? <ButtonIcon /> : children}
        </ButtonContainer>
    );
}

export default Button;
