import styled from 'styled-components';

import { CssTextLengthLimit } from '../../index.styles';

export const Message = styled.div<{ isMine: boolean }>`
    display: flex;
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    background-color: ${({ isMine }) =>
        isMine ? 'var(--indigo-700)' : 'var(--gray-200)'};
    padding: 0.5rem 1rem;
    border-radius: ${({ isMine }) =>
        isMine ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 20%;
    gap: 1rem;
    position: relative;
`;

export const SenderProfile = styled.img<{ isMine: boolean }>`
    display: ${({ isMine }) => (isMine ? 'none' : '')};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
`;

export const SenderName = styled.h2<{ isMine: boolean; chars: number }>`
    color: var(--gray-700);
    display: ${({ isMine }) => (isMine ? 'none' : '')};
    font-weight: 700;
    ${CssTextLengthLimit}
    font-size: 0.75rem;
`;

export const MessageContent = styled.p<{ isMine?: boolean }>`
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${({ isMine }) => (isMine ? 'white' : ' var(--gray-800)')};
    word-break: break-all;
`;

export const MessageDate = styled.p<{ isMine: boolean }>`
    display: flex;
    justify-content: flex-end;
    font-size: 0.65rem;
    color: ${({ isMine }) => (isMine ? 'white' : 'var(--gray-800)')};
    opacity: 0.85;
    user-select: none;

    &:hover {
        opacity: 1;
    }
`;

export const OptionsButton = styled.button`
    color: white;
    padding: 0.25rem;
    transition: all 0.2s ease-in-out;
    border-radius: 99rem;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
