import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const TagContainer = styled.div<{
    size?: string;
    deletable?: boolean;
    variant: string;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: ${({ deletable }) =>
        deletable ? '0.2rem 0.2rem 0.2rem 1rem' : '0.3rem 1rem'};
    border-radius: 10000px;
    font-size: ${({ size }) => {
        switch (size) {
            case 'xs':
                return '0.65rem';
            case 'sm':
                return '0.75rem';
            case 'md':
            case undefined:
                return '0.85rem';
            case 'lg':
                return '1rem';
            default:
                return '0.85rem';
        }
    }};
    background-color: ${({ variant }) => {
        switch (variant) {
            case 'normal':
            case undefined:
                return 'var(--indigo-100)';
            case 'darker':
                return 'var(--indigo-200)';
            default:
                return 'black';
        }
    }};
    cursor: pointer;

    &:hover {
        background-color: var(--indigo-800);
        color: white;
    }
    transition: all 0.25s ease-in-out;
`;

export const TagText = styled.p<{ width?: string }>`
    font-weight: bold;
    ${CSSTextLengthLimit}
    max-width: 12ch;
`;

export const DeleteTagButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    padding: 0.2rem 0.5rem;
    background-color: white;
    font-weight: bolder;
    transition: all 0.25s ease-in-out;
    aspect-ratio: 1;
    color: black;
    &:hover {
        background-color: var(--gray-400);
    }
`;
