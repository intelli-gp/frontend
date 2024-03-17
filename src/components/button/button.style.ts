import { GoSync } from 'react-icons/go';
import styled, { css } from 'styled-components';

interface ButtonProps {
    children: React.ReactNode;
    type: 'button' | 'submit' | 'reset';
    select?:
        | 'primary'
        | 'primary700'
        | 'primary500'
        | 'primary300'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger';
    rounded?: boolean;
    loading?: boolean;
    className?: string;
    outline?: boolean;
    rest?: any;
}

export const ButtonContainer = styled.button<ButtonProps>`
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    padding: 8px 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    color: white;
    border-radius: ${({ rounded }) => (rounded ? '50%' : '7px')};
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
                        border: 2px solid white;
                        color: white;
                        &:hover {
                            background-color: white;
                            color: var(--indigo-950);
                        }
                    `;
                case 'secondary':
                    return css`
                        border: 2px solid #718096;
                        color: #718096;
                        &:hover {
                            background-color: #718096;
                            color: white;
                        }
                    `;
                case 'success':
                    return css`
                        border: 2px solid #48bb78;
                        color: #48bb78;
                        &:hover {
                            background-color: #48bb78;
                            color: white;
                        }
                    `;
                case 'warning':
                    return css`
                        border: 2px solid #ecc94b;
                        color: #ecc94b;
                        &:hover {
                            background-color: #ecc94b;
                            color: white;
                        }
                    `;
                case 'danger':
                    return css`
                        border: 2px solid #f56565;
                        color: #f56565;
                        &:hover {
                            background-color: #f56565;
                            color: white;
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
                        border: 2px solid var(--indigo-800);
                    `;
                case 'primary700':
                    return css`
                        background-color: var(--indigo-700);
                        border: 2px solid var(--indigo-700);
                    `;
                case 'primary500':
                    return css`
                        background-color: var(--indigo-500);
                        border: 2px solid var(--indigo-500);
                    `;
                case 'primary300':
                    return css`
                        background-color: var(--indigo-300);
                        border: 2px solid var(--indigo-300);
                    `;
                case 'secondary':
                    return css`
                        background-color: #f1ee63;
                        border: 2px solid #f1ee63;

                        color: #252f3f;
                    `;
                case 'success':
                    return css`
                        background-color: #48bb78;
                    `;
                case 'warning':
                    return css`
                        background-color: #ecc94b;
                    `;
                case 'danger':
                    return css`
                        background-color: #f56565;
                    `;
                default:
                    return null;
            }
        }
    }}
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
