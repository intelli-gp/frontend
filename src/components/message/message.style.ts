import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const Message = styled.div<{
    isMine: boolean;
    hasReactions: boolean;
    showReactions: boolean;
}>`
    display: flex;
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    background-color: ${({ isMine }) =>
        isMine ? 'var(--indigo-800)' : 'var(--gray-300)'};
    padding: 1rem;
    padding-bottom: ${({ hasReactions, showReactions }) =>
        hasReactions && showReactions ? '0.75rem' : '0.5rem'};
    border-radius: ${({ isMine }) =>
        isMine ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 20%;
    gap: 0.5rem;
    position: relative;
    margin-bottom: ${({ hasReactions, showReactions }) =>
        hasReactions && showReactions ? '1rem' : '0'};
    .options-button {
        transition: opacity 0.2s ease-in-out;
        opacity: 0;
    }
    &:hover {
        .options-button {
            opacity: 1;
        }
    }
`;

export const MessageHeader = styled.header<{ isMine: boolean }>`
    display: ${({ isMine }) => (isMine ? 'none' : 'flex')};
    gap: 0.5rem;
    align-items: center;
`;

export const SenderProfile = styled(EnhancedImage)`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`;

export const SenderName = styled(Link)<{ isMine?: boolean; width?: string }>`
    color: var(--gray-700);
    display: ${({ isMine }) => (isMine ? 'none' : '')};
    font-weight: 700;
    font-size: 0.875rem;
    ${CSSTextLengthLimit}
    &:hover {
        text-decoration: underline;
    }
`;

export const MessageContent = styled.main<{
    isMine?: boolean;
    isDeleted?: boolean;
    width?: string;
    lines?: number;
}>`
    margin-top: 0rem;
    color: ${({ isMine }) => (isMine ? 'white' : ' var(--gray-800)')};
    opacity: ${({ isDeleted }) => (isDeleted ? 0.5 : 1)};
    word-break: break-all;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    ${CSSTextLinesCountLimit}
`;

export const MessageReactions = styled.div<{ isMine?: boolean }>`
    position: absolute;
    bottom: 0;
    left: ${({ isMine }) => (isMine ? 'auto' : '0.25rem')};
    right: ${({ isMine }) => (isMine ? '0.25rem' : 'auto')};
    background-color: white;
    padding: 0.1rem 0.5rem 0.1rem 0.25rem;
    border-radius: 1rem;
    transform: translateY(50%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 8px 0px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    line-height: 1.25;
    transition: scale 0.25s ease-in-out;
    &:hover {
        scale: 1.025;
    }
`;

export const EmojisContainer = styled.span`
    display: flex;
    letter-spacing: -2px;
`;

export const EmojisCounter = styled.span`
    font-size: 0.875rem;
    margin-left: 0.25rem;
    font-family: 'jetbrains mono', monospace;
`;

export const MessageDate = styled.p<{ isMine: boolean }>`
    display: flex;
    justify-content: flex-end;
    font-size: 0.6rem;
    color: ${({ isMine }) => (isMine ? 'white' : 'var(--gray-800)')};
    opacity: 0.85;
    user-select: none;
`;

export const OptionsButton = styled.button<{ isMine?: boolean }>`
    color: ${({ isMine }) => (isMine ? 'white' : 'inherit')};
    padding: 0.5rem;
    background-color: ${({ isMine }) =>
        isMine ? 'var(--indigo-800)' : 'var(--gray-300)'};
    border-radius: 50%;
`;

export const MessageInfoModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const MessageInfoReadContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MessageInfoUsersList = styled.ul`
    overflow-y: auto;
`;

export const MessageInfoSectionLabel = styled.label`
    font-size: 0.875rem;
    opacity: 0.6;
    border-bottom: 1px solid var(--gray-300);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
`;
