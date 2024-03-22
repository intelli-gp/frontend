import styled from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';

export const NotificationImage = styled.img`
    object-fit: cover;
    aspect-ratio: 1/1;
    width: 3rem;
    height: 3rem;
    border-radius: 99rem;
`;

export const NotificationTitle = styled.h2<{ width?: string }>`
    font-size: 0.9rem;
    font-weight: 600;
    ${CSSTextLengthLimit}
    width: 20ch;
`;

export const NotificationContent = styled.p<{ width?: string; lines?: number }>`
    font-size: 0.75rem;
    word-break: break-word;
    ${CSSTextLinesCountLimit}
`;
export const SenderName = styled.span`
    font-weight: 700;
    color: var(--gray-700);
`;

export const DismissButton = styled.button`
    padding: 0.5rem;
    color: red;
    transition: all 0.3s;
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;

    &:hover {
        font-weight: 700;
    }
`;
