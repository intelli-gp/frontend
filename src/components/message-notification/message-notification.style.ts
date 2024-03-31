import styled from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';
import EnhancedImage from "../image/image.component"

export const NotificationImage = styled(EnhancedImage)`
    object-fit: cover;
    aspect-ratio: 1/1;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
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

export const DismissButton = styled.span`
    cursor: pointer;
    position: absolute;
    line-height: 1;
    right: 0.25rem;
    top: 0.25rem;
    padding: 0.35rem;
    border-radius: 50%;
    transition: all 0.25s ease-in-out;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
