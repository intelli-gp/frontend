import { motion } from 'framer-motion';
import { BsStars } from 'react-icons/bs';
import styled from 'styled-components';

import Button from '../../components/button/button.component';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100vh - 56px);
    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

export const SearchBarContainer = styled.div`
    width: 100%;
    border-radius: 5rem;
    border: 1px solid var(--gray-300);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
    position: relative;
    z-index: 1;
`;

export const Background = styled(motion.div)`
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    width: 100%;
`;

export const AttachmentIcon = styled(BsStars)`
    box-sizing: content-box;
    padding: 0.7rem 1rem;
    color: var(--indigo-900);
    border-radius: 5rem 0rem 0rem 5rem;
    transition: all 0.1s ease-in-out;
`;

export const GenerateButton = styled(Button)`
    padding: 0.5rem 2rem;
    padding-left: 1rem;
    border-radius: 0rem 5rem 5rem 0rem;
    background-color: var(--indigo-100);
    color: inherit;
    border: none;
    height: 40px;
    width: 120px;
    box-shadow: inset 10px 0px 6px -6px rgb(99, 102, 241, 0.075);
    transition: all 0.1s ease-in-out;
    &:hover {
        background-color: var(--indigo-200);
    }
`;
export const Holder = styled.div`
    width: 100%;
    background-color: var(--indigo-100);
    border-radius: 6px;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
