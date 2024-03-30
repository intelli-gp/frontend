import { motion } from 'framer-motion';
import styled from 'styled-components';

import { CSSTextLengthLimit } from '../../index.styles';

export const PageContainer = styled(motion.div)`
    display: flex;
    gap: 0.5rem;
    height: 100%;
    background: var(--indigo-50);
    padding: 1rem;

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

export const GroupImage = styled.img`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    object-fit: cover;
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
    position: relative;
    gap: 0.5rem;
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
    border-radius: 10rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
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

export const GroupUserFullName = styled.h2<{ width?: string }>`
    font-size: 0.8rem;
    ${CSSTextLengthLimit}
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

export const HeaderButton = styled.button`
    cursor: pointer;
    opacity: 0.8;
    color: var(--gray-700);
    padding: 0.75rem;
    border-radius: 5rem;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 1;
        background-color: var(--indigo-50);
    }
`;
