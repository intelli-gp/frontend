import styled, { css, keyframes } from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    gap: 1rem;
    background: var(--indigo-50);
    padding: 1rem;
`;

export const LeftPart = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 100vh;
    justify-content: space-between;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const ChatHeader = styled.div`
    border-radius: 15px;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    height: 80px;
    background: white;
    display: flex;
    flex-direction: row;
    padding: 20px 25px;
    align-items: center;
    gap: 1rem;
`;

export const GroupName = styled.h1`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 24ch;
    font-weight: 700;
    color: var(--gray-800);
    font-size: 1.2rem;
`;

export const GroupTypingStatus = styled.p`
    font-size: 0.8rem;
`;

export const GroupImage = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    object-fit: cover;
`;

export const ChatBody = styled.div`
    border-radius: 15px;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    padding: 30px;
    flex-grow: 1;
    gap: 20px;
    background-color: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    /* width */
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        width: 0.5rem;
        background: rgba(0, 0, 0, 0.025);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background-color: var(--gray-300);
        border-radius: 99rem;
    }

    & > div:first-child {
        flex: 1 1 auto;
        min-height: 6px;
    }
`;

const scrollbarStyles = css`
    .epr_b8hfyo::-webkit-scrollbar {
        width: 0.4rem;
    }
    .epr_b8hfyo::-webkit-scrollbar-track {
        background: transparent;
        background-color: rgba(0, 0, 0, 0.025);
    }
    .epr_b8hfyo::-webkit-scrollbar-thumb {
        background: var(--gray-300);
        border-radius: 1rem;
    }
`;

export const ChatFooter = styled.div`
    ${scrollbarStyles}
    border-radius: 15px;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    height: 75px;
    background: white;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 0.25rem;
`;

export const RightPart = styled.div`
    height: 100%;
    width: 25%;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const UsersContainer = styled.div`
    height: 100%;
    width: 100%;
    background: white;
    border-radius: 15px;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    padding: 30px 25px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    /* width */
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        width: 0.6rem;
        background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: var(--gray-300);
        opacity: 0.2;
    }

    & > div:first-child {
        /* flex: 1 1 auto; */
        min-height: 6px;
    }

    @media (max-width: 1024px) {
        padding: 30px 12px;
        display: flex;
        h1 {
            font-size: 12px;
        }
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

export const GroupUserFullName = styled.h2`
    font-size: 0.8rem;
    max-width: 12ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
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
export const EditButton = styled.button`
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
