import styled, { css } from 'styled-components';

export const PageTitle = styled.h1`
    user-select: none;
    line-height: 1.25;
    font-weight: 700;
    font-size: 2.75rem;
    color: var(--gray-800);

    @media (max-width: 768px) {
        line-height: 0.9;
    }
`;

export const ModalTitle = styled.h2<{ fontSize?: 'sm' | 'md' | 'lg' | string }>`
    user-select: none;
    font-weight: 700;
    font-size: ${({ fontSize }) => {
        switch (fontSize) {
            case 'sm':
                return '1.5rem';
            case 'md':
            case undefined:
                return '2rem';
            case 'lg':
                return '2.5rem';
            default:
                return fontSize;
        }
    }};
    color: var(--gray-800);
`;

export const CssTextLengthLimit = css<{ chars?: number; lines?: number }>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: ${(props) => props.chars || 10}ch;
`;
