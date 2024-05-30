import { GoSync } from 'react-icons/go';
import styled, { css } from 'styled-components';

import { ButtonVariant } from './button.component';

interface ButtonProps {
    children: React.ReactNode;
    type: 'button' | 'submit' | 'reset';
    select?: ButtonVariant;
    rounded?: boolean;
    loading?: boolean;
    className?: string;
    outline?: boolean;
    rest?: any;
    disabled?: boolean;
}

export const ButtonContainer = styled.button<ButtonProps>`
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    padding: 0.35rem 1rem;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    color: white;
    transition: all 0.25s ease-in-out;
    border-radius: ${({ rounded }) => (rounded ? '50%' : '7px')};
    border-width: 2px;
    cursor: ${({ loading }) => (loading ? 'not-allowed' : 'pointer')};
    ${({ className }) => className};
    &:hover {
        opacity: 0.9;
    }
    ${({ select, outline }) => {
        if (outline) {
            switch (select) {
                case 'primary':
                    return css`
                        border-color: var(--indigo-800);
                        color: var(--indigo-800);
                        &:hover {
                            background-color: var(--indigo-800);
                            color: white;
                        }
                    `;
                case 'secondary':
                    return css`
                        border-color: #718096;
                        color: #718096;
                        background-color: transparent;
                        &:hover {
                            background-color: #718096;
                            color: white;
                        }
                    `;
                case 'success':
                    return css`
                        border-color: var(--green-500);
                        color: var(--green-500);
                        background-color: transparent;
                        &:hover {
                            background-color: var(--green-500);
                            color: white;
                        }
                    `;
                case 'warning':
                    return css`
                        border-color: #ecc94b;
                        color: #ecc94b;
                        &:hover {
                            background-color: #ecc94b;
                            color: white;
                        }
                    `;
                case 'danger':
                    return css`
                        border-color: #c92a2a;
                        color: #c92a2a;
                        &:hover {
                            background-color: rgba(255, 0, 0, 0.075);
                        }
                    `;
                default:
                    return null;
            }
        } else {
            switch (select) {
                case 'primary':
                    return css`
                        background-color: var(--indigo-800);
                        border-color: var(--indigo-800);
                    `;
                case 'primary700':
                    return css`
                        background-color: var(--indigo-700);
                        border-color: var(--indigo-700);
                    `;
                case 'primary500':
                    return css`
                        background-color: var(--indigo-500);
                        border-color: var(--indigo-500);
                    `;
                case 'primary300':
                    return css`
                        background-color: var(--indigo-300);
                        border-color: var(--indigo-300);
                        color: var(--indigo-950);
                    `;
                case 'primary200':
                    return css`
                        background-color: var(--indigo-200);
                        border-color: var(--indigo-200);
                        color: var(--indigo-950);
                    `;
                case 'primary100':
                    return css`
                        background-color: var(--indigo-100);
                        border-color: var(--indigo-100);
                        color: var(--indigo-950);
                    `;
                case 'secondary':
                    return css`
                        background-color: var(--yellow-400);
                        border-color: var(--yellow-400);
                        color: var(--gray-800);
                    `;
                case 'success':
                    return css`
                        background-color: var(--green-500);
                        border-color: var(--green-500);
                    `;
                case 'warning':
                    return css`
                        background-color: var(--yellow-500);
                        border-color: var(--yellow-500);
                        color: inherit;
                    `;
                case 'danger':
                    return css`
                        background-color: #c92a2a;
                        border-color: #c92a2a;
                        color: white;
                    `;
                default:
                    return null;
            }
        }
    }}

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.5;
            cursor: not-allowed;
            &:hover {
                opacity: 0.5;
            }
        `}
`;

export const ButtonIcon = styled(GoSync)`
    animation: spin 1s infinite linear;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
