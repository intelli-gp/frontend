import styled from 'styled-components';

import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';

export const Message = styled.div<{ isMine: boolean }>`
    display: flex;
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    background-color: ${({ isMine }) =>
        isMine ? 'var(--indigo-700)' : 'var(--gray-200)'};
    padding: 1rem;
    border-radius: ${({ isMine }) =>
        isMine ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 20%;
    gap: 0.5rem;
    position: relative;

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

export const SenderProfile = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    aspect-ratio: 1/1;
`;

export const SenderName = styled.h2<{ isMine?: boolean; width?: string }>`
    color: var(--gray-700);
    display: ${({ isMine }) => (isMine ? 'none' : '')};
    font-weight: 700;
    font-size: 0.75rem;
    ${CSSTextLengthLimit}
`;

export const MessageContent = styled.main<{
    isMine?: boolean;
    isDeleted?: boolean;
    width?: string;
    lines?: number;
}>`
    margin-top: 0rem;
    font-size: 0.85rem;
    color: ${({ isMine }) => (isMine ? 'white' : ' var(--gray-800)')};
    opacity: ${({ isDeleted }) => (isDeleted ? 0.5 : 1)};
    word-break: break-all;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    ${CSSTextLinesCountLimit}
`;

export const MessageDate = styled.p<{ isMine: boolean }>`
    display: flex;
    justify-content: flex-end;
    font-size: 0.6rem;
    color: ${({ isMine }) => (isMine ? 'white' : 'var(--gray-800)')};
    opacity: 0.85;
    user-select: none;
`;

export const OptionsButton = styled.button`
    color: white;
    padding: 0.5rem;
    border-top-right-radius: 1rem;
    background-color: var(--indigo-700);
`;

export const MessageInfoModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const MessageInfoReadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const MessageInfoSectionLabel = styled.label`
    font-size: 0.875rem;
    opacity: 0.6;
    border-bottom: 1px solid var(--gray-300);
    padding-bottom: 0.25rem;
`;

export const MessageInfoUserContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const MessageInfoUserProfile = styled.img`
    width: 50px;
    height: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
`;

export const MessageInfoUserFullName = styled.p`
    font-weight: 700;
    font-size: 1rem;
`;

export const MessageInfoUserReadTime = styled.p`
    font-size: 0.75rem;
    opacity: 0.6;
`;
