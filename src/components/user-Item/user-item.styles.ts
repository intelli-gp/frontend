import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import Button from '../button/button.component';
import EnhancedImage from '../image/image.component';

export const UserItemContainer = styled.li`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 0.25rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--gray-300);
    }
`;

export const UserFullName = styled(Link)<{ width?: string }>`
    color: inherit;
    display: block;
    ${CSSTextLengthLimit}
    &:hover {
        text-decoration: underline;
    }
`;

export const UserUserName = styled.p<{ width?: string }>`
    font-size: 0.875rem;
    opacity: 0.8;
    margin-top: -0.4rem;
    ${CSSTextLengthLimit}
`;

export const UserItemImage = styled(EnhancedImage)`
    width: 42px;
    height: 42px;
    aspect-ratio: 1/1;
    flex-shrink: 0;
    border-radius: 50%;
`;

export const ActionButton = styled(Button)`
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    margin-left: auto;
`;

export const Emoji = styled.span`
    font-size: 1.5rem;
    margin-left: auto;
`;

export const TimeInfo = styled.time`
    margin-left: auto;
    font-size: 0.75rem;
    opacity: 0.8;
`;
