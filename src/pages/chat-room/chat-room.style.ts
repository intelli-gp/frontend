import { motion } from 'framer-motion';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { LuPaperclip } from 'react-icons/lu';
import { RiEmotionLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import EnhancedImage from '../../components/image/image.component';
import { CSSTextLengthLimit } from '../../index.styles';

export const PageContainer = styled(motion.div)`
    display: flex;
    gap: 0.5rem;
    height: 100%;
    padding: 1rem;
    margin: 0 auto;
    max-width: 1200px;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`;

export const LeftPart = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 100vh;
    justify-content: space-between;
    @media (max-width: 1024px) {
        width: 100%;
    }
`;

export const ChatHeader = styled.div`
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    padding: 1rem 2rem;
    align-items: center;
    gap: 1rem;
`;

export const GroupName = styled.h1`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 24ch;
    font-weight: 700;
    font-size: 1rem;
`;

export const GroupTypingStatus = styled.p`
    font-size: 0.8rem;
`;

export const GroupImage = styled(EnhancedImage)`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
`;

export const ChatBody = styled.div`
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    padding: 2rem;
    flex-grow: 1;
    gap: 0.25rem;
    background-color: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 1024px) {
        padding: 1rem;
    }
`;

export const ChatFooter = styled.div`
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    background: white;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    gap: 0.5rem;
`;
export const UploadImageContainer = styled.img`
    height: 60px;
    width: 70px;
    border-radius: 0.25rem;
`;
export const DeleteImg = styled(IoMdCloseCircle)`
    position: absolute;
    right: 0;
    top: 0;
    height: 20px;
    width: 20px;
    color: var(--indigo-100);
    background-color: var(--indigo-900);
    border-radius: 3rem;
    border: 0px solid transperent;
    index-z: 40;
`;
export const FooterInputArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
`;

export const MessageInput = styled.div`
    background-color: var(--gray-100);
    width: 100%;
    max-height: 4rem;
    overflow: auto;
    outline: none;
    padding: 0.4rem;
    border-radius: 0.25rem;
`;

const commonFooterIconStyles = css`
    color: var(--indigo-800);
    box-sizing: content-box;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    padding: 0.5rem;
    border-radius: 50%;
    &:hover {
        color: black;
        background-color: var(--indigo-100);
    }
`;

export const EmojisIcon = styled(RiEmotionLine)`
    ${commonFooterIconStyles}
`;

export const AttachIcon = styled(LuPaperclip)`
    ${commonFooterIconStyles}
`;

export const SendIcon = styled(IoSend)`
    ${commonFooterIconStyles}
`;

export const RightPart = styled.div`
    height: 100%;
    width: max(20%, 250px);
    transition: right 0.35s ease-in-out;
    @media (max-width: 1024px) {
        height: 100%;
        position: fixed;
        right: -100%;
        top: 0;
        width: 250px;
        &.open {
            right: 0;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
            z-index: 100;
        }
    }
`;

export const UsersContainer = styled.div`
    height: 100%;
    width: 100%;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    padding: 2rem 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 1024px) {
        border-radius: 0;
    }
`;

export const UserContainer = styled.div`
    width: 100%;
    cursor: pointer;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    padding-right: 1rem;
    img {
        border-radius: 50%;
        height: 48px;
        width: 48px;
    }
    span {
        display: flex;
        flex-direction: column;
    }
    &:hover {
        background-color: var(--indigo-50);
    }
`;

export const GroupUserFullName = styled(Link)<{ width?: string }>`
    font-size: 0.875rem;
    font-weight: 500;
    color: inherit;
    ${CSSTextLengthLimit}

    &:hover {
        text-decoration: underline;
    }
`;

export const StyledBadge = styled.span<{ online: boolean }>`
    &::after {
        content: '';
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 5rem;
        background-color: ${({ online }) => (online ? '#44b700' : '#D30000')};
    }
`;
