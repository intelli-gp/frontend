import styled from 'styled-components';
import { motion } from 'framer-motion';

import image from '../../assets/imgs/AI-helper.svg';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    background: var(--indigo-50);
    height: 100vh;
    background-image: url(${image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export const ChatHeader = styled.div`
    width: 100%;
    height: 70px;
    background: var(--gray-50);
    display: flex;
    flex-direction: row;
    padding: 20px 55px;
    justify-content: space-between;
    align-items: center;
`;
export const AIicon = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;
export const ChatBody = styled.div`
    width: 100%;
    padding: 34px;
    flex-grow: 1;
    gap: 20px;
    background: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    & > div:first-child {
        flex: 1 1 auto;
        min-height: 6px;
    }
`;

export const Messagebar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 100%;
    border: 2px solid var(--gray-500);
    border-radius: 10px;
    background: var(--gray-50);
    transition: background 0.25s;
    padding: 10px 15px;
    input {
        background: transparent;
        outline: none;
        border: none;
        flex: 1;
    }
    &:focus-within {
        border: 2px solid #4f46e5;
    }
`;
export const ChatFooter = styled.div`
    width: 100%;
    height: 75px;
    background: white;
    padding: 10px 32px 15px 32px;
`;

export const ChatBox = styled.div<{ incoming: boolean }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: ${({ incoming }) =>
        incoming ? 'flex-end' : 'flex-start'};

    p {
        color: ${({ incoming }) => (incoming ? 'white' : ' var(--gray-800)')};
    }

    span {
        display: flex;
        justify-content: flex-end;
        font-size: 10px;
        color: ${({ incoming }) => (incoming ? 'white' : 'var(--slate-500)')};
    }
`;
export const Message = styled.div<{ incoming: boolean }>`
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
`;
