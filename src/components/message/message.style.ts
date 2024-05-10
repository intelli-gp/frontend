import { IoCloseOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { MdFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';
import EnhancedImage from '../image/image.component';

export const Message = styled.div<{
    isMine: boolean;
    hasReactions?: boolean;
    isReply?: boolean;
}>`
    display: flex;
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    background-color: ${({ isMine }) =>
        isMine ? 'var(--indigo-800)' : 'var(--gray-200)'};
    padding: 1rem;
    padding-bottom: ${({ hasReactions }) =>
        hasReactions ? '0.75rem' : '0.5rem'};
    border-radius: ${({ isMine }) =>
        isMine ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 20%;
    gap: ${({ isReply }) => (isReply ? '0.75rem' : '0.5rem')};
    position: relative;
    margin-bottom: ${({ hasReactions }) => (hasReactions ? '1rem' : '0')};
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

export const MessageHeader = styled.header<{ isMine?: boolean }>`
    display: ${({ isMine }) => (isMine ? 'none' : 'flex')};
    gap: 0.5rem;
    align-items: center;
`;

export const SenderProfile = styled(EnhancedImage)<{ width?: string }>`
    width: ${({ width }) => (width ? width : '24px')};
    height: ${({ width }) => (width ? width : '24px')};
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

const commonIconStyles = css`
    color: var(--indigo-900);
    cursor: pointer;
    box-sizing: content-box;
    transition: all 0.1s ease-in-out;
    padding: 0.5rem;
    border-radius: 50%;
    &:hover {
        color: black;
        background-color: var(--indigo-100);
    }
`;
export const DownloadIcon = styled(MdFileDownload)`
    ${commonIconStyles}
`;
export const CloseIcon = styled(IoClose)`
    ${commonIconStyles}
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
    word-break: break-word;
    display: flex;
    gap: 0.25rem;
    align-items: center;
`;
export const ImageContent = styled.img<{
    isMine?: boolean;
    isDeleted?: boolean;
}>`
    margin-top: 0rem;
    color: ${({ isMine }) => (isMine ? 'white' : ' var(--gray-800)')};
    opacity: ${({ isDeleted }) => (isDeleted ? 0.5 : 1)};
    display: flex;
    border-radius: 6px;
    max-width: 230px;
    align-items: center;
`;
export const ImageContainer = styled.img`
    height: 60px;
    width: 70px;
    border-radius: 0.25rem;
`;
export const ImageHeader = styled.div`
    height: 60px;
    width: 70px;
    border-radius: 0.25rem;
`;
export const MessageReactions = styled.div<{ isMine?: boolean }>`
    position: absolute;
    bottom: 0;
    left: ${({ isMine }) => (isMine ? 'auto' : '0.25rem')};
    right: ${({ isMine }) => (isMine ? '0.25rem' : 'auto')};
    background-color: white;
    padding: 0.1rem 0.5rem 0.1rem 0.25rem;
    border-radius: 1rem;
    transform: translateY(60%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 8px 0px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
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

export const MessageDate = styled.p<{ isMine?: boolean }>`
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
        isMine ? 'var(--indigo-800)' : 'var(--gray-200)'};
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
    padding: 0 1rem;
`;

export const MessageInfoSectionLabel = styled.label`
    font-size: 0.875rem;
    opacity: 0.6;
    border-bottom: 1px solid var(--gray-300);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
`;

export const ReplyToMessageContainer = styled.div<{
    replyByMe?: boolean;
    passive?: boolean;
}>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    padding-right: 1rem;
    border-radius: 0.35rem;
    background-color: var(--indigo-100);
    border-left: 5px solid var(--indigo-700);
    border-right: 5px solid var(--indigo-700);
    width: 100%;

    ${({ passive, replyByMe }) => {
        let style = css``;
        if (passive) {
            style = css`
                border-right: none;
                padding: 0.75rem 1rem;
                font-size: 0.875rem;
            `;
        }
        if (passive && replyByMe) {
            style = css`
                ${style}
                color: rgba(255, 255, 255, 0.85);
                background-color: rgba(255, 255, 255, 0.1);
                border-color: white;
            `;
        } else if (passive && !replyByMe) {
            style = css`
                ${style}
                background-color: rgba(0, 0, 0, 0.1);
                border-color: black;
                color: rgba(0, 0, 0, 0.85);
            `;
        } else {
            style = css`
                ${style}
            `;
        }
        return style;
    }}
`;

export const ReplyToMessageMain = styled.main`
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    overflow: hidden;
    width: 95%;
`;

export const ReplyToMessageSenderName = styled(SenderName)<{
    passive?: boolean;
    replyByMe?: boolean;
}>`
    ${({ passive, replyByMe }) => {
        if (passive && replyByMe) {
            return css`
                color: white;
            `;
        } else if (passive && !replyByMe) {
            return css`
                color: black;
            `;
        } else {
            return css`
                font-size: 1rem;
                color: var(--indigo-900);
            `;
        }
    }}
`;

export const ReplyToMessageCloseButton = styled(IoCloseOutline)`
    width: 24px;
    height: 24px;
    padding: 0.25rem;
    box-sizing: content-box;
    border-radius: 50%;
    cursor: pointer;
    margin-left: auto;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const ReplyToMessageContent = styled(MessageContent)`
    ${CSSTextLinesCountLimit}
    color: inherit;
`;
