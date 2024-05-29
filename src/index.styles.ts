import styled, { css } from 'styled-components';

export const PageTitle = styled.h1<{ size?: 'lg' | 'md' | 'sm' }>`
    background-color: white;
    width: 100%;
    user-select: none;
    line-height: 1.25;
    font-weight: 700;
    font-size: ${({ size = 'md' }) => {
        switch (size) {
            case 'lg':
                return '3.25rem';
            case 'md':
                return '2.5rem';
            case 'sm':
                return '2rem';
        }
    }};
    letter-spacing: -1.5px;

    @media (max-width: 768px) {
        font-size: 2rem;
        line-height: 1;
    }
`;

export const ModalTitle = styled.h2<{ fontSize?: 'sm' | 'md' | 'lg' | string }>`
    color: var(--gray-800);
    user-select: none;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -1px;
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
`;

/**
 * Truncate the text length and add ... at the end.
 * @default
 * width: 100%
 */
export const CSSTextLengthLimit = css<{ width?: string }>`
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${({ width }) => width || '100%'};
    white-space: nowrap;
`;

/**
 * Limit the number of lines of a text to the provided @param lines
 * and add ... at the end of the text.
 * If lines not passed then no limit is applied
 * @default
 * width: 100%
 */
export const CSSTextLinesCountLimit = css<{ width?: string; lines?: number }>`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: ${({ lines }) => (lines ? 'vertical' : 'horizontal')};
    width: ${({ width }) => width || '100%'};
    -webkit-line-clamp: ${({ lines }) => lines || 1000};
`;

export const BetweenPageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
};
