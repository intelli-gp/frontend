import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const CardContainer = styled.div<{ unread: boolean }>`
    gap: 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0.75rem;
    border-radius: 10px;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    cursor: pointer;
    background-color: ${({ unread }) =>
        unread ? 'var(--indigo-25)' : 'white'};
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }
`;

export const CardImage = styled(EnhancedImage)`
    width: 75px;
    height: 75px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`;

export const TypographyContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
`;

export const ChatDate = styled.time`
    font-size: 0.75rem;
    opacity: 0.9;
`;

export const UnreadMessagesCounter = styled.div`
    font-size: 0.75rem;
    border-radius: 1rem;
    padding: 0.5rem 0.6rem;
    background-color: var(--yellow-600);
    font-weight: 700;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    line-height: 1;
`;

export const LastMessageContent = styled.div<{ width?: string }>`
    ${CSSTextLengthLimit};
    font-size: 0.875rem;
`;

export const LastMessageAuthorName = styled.span`
    font-weight: bold;
`;

export const GroupTitle = styled.p<{ width?: string }>`
    ${CSSTextLengthLimit}
    font-weight: bold;
    font-size: 1rem;
`;
