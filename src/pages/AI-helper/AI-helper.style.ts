import { motion } from 'framer-motion';
import styled from 'styled-components';

import EnhancedImage from '../../components/image/image.component';

export const DefaultPromptsContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    justify-content: center;
    margin-top: -5rem;
`;


export const DefaultPromptCardContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    border: 0.1rem solid var(--indigo-200);
    padding: 1.25rem;
    border-radius: 1rem;
    color: var(--indigo-400);
    width: 25%;
    cursor: pointer;

    &:hover {
        background-color: var(--indigo-50);
        border-color: var(--indigo-300);
        color: var(--indigo-500);
    }

    span {
        transform: scale(1.5)
    }
`;

export const PageContainer = styled(motion.div)`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--indigo-50);
    width: min(100%, 1200px);
    margin: 0 auto;
    gap: 0.5rem;
`;

export const ChatHeader = styled.div`
    width: 100%;
    background: white;
    display: flex;
    padding: 0.75rem 2.25rem;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.1);
    height: 75px;
    border-radius: 0.5rem;
`;

export const AIAvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const AIicon = styled(EnhancedImage)`
    border-radius: 50%;
    height: 40px;
    width: 40px;
`;

export const ChatBody = styled.div`
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.15);
    width: 100%;
    padding: 2rem;
    gap: 0.5rem;
    background: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    flex-grow: 1;
`;

export const ChatFooter = styled.div`
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.15);
    display: flex;
    background: white;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
    height: 90px;
    border-radius: 0.5rem;
`;
