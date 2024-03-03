import styled, { css, keyframes } from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    gap: 30px;
    justify-content: space-between;
    background: var(--indigo-50);
    padding: 30px 60px;
    @media (max-width: 768px) {
        padding: 30px 20px;
    }
`;

export const LeftPart = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 18px;
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
    justify-content: space-between;
    align-items: center;
`;
export const GroupIcon = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
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
        width: 0.6rem;
        background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: var(--gray-300);
        opacity: 0.2;
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
    }
    .epr_b8hfyo::-webkit-scrollbar-thumb {
        background: var(--gray-300);
    }
`;

export const ChatFooter = styled.div`
    ${scrollbarStyles}

    border-radius: 15px;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    height: 75px;
    background: white;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;
export const RightPart = styled.div`
    height: 100%;
    width: 20%;
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
        flex: 1 1 auto;
        min-height: 6px;
    }

    @media (max-width: 1024px) {
        padding: 30px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1 {
            font-size: 12px;
        }
    }
`;
export const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 20px 0px;
    img {
        border-radius: 50%;
        height: 48px;
        width: 48px;
    }
    span {
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
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
type onlineType = {
    online: boolean;
};
export const StyledBadge = styled.span<onlineType>`
    &::after {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ online }) => (online ? '#44b700' : '#D30000')};
        color: ${({ online }) => (online ? '#44b700' : '#D30000')};
        box-shadow: 0 0 0 2px #fff;
        border: 1px solid currentColor;
    }
`;
type userType = {
    incoming: boolean;
};
export const ChatBox = styled.div<userType>`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: ${({ incoming }) =>
        incoming ? 'flex-end' : 'flex-start'};

    & > div:first-child {
        background-color: ${({ incoming }) =>
            incoming ? 'var(--indigo-600)' : 'var(  --gray-200)'};
        padding: ${({ incoming }) => (incoming ? '8px  15px ' : '15px')};
        border-radius: ${({ incoming }) =>
            incoming ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 40%;
        min-width: 20%;
    }
    h1 {
        display: ${({ incoming }) => (incoming ? 'none' : '')};
        font-weight: 600;
    }
    p {
        color: ${({ incoming }) => (incoming ? 'white' : ' var(--gray-800)')};
    }

    img {
        display: ${({ incoming }) => (incoming ? 'none' : '')};
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    span {
        display: flex;
        justify-content: flex-end;
        font-size: 10px;
        color: ${({ incoming }) => (incoming ? 'white' : 'var(--slate-500)')};
    }
`;
