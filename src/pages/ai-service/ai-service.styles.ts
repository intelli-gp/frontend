import { motion } from 'framer-motion';
import { BsStars } from 'react-icons/bs';
import styled from 'styled-components';

import Button from '../../components/button/button.component';
import { CustomInput } from '../../components/input/Input.component';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: calc(100vh - var(--mobile-nav-height));
    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

export const SearchBarContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
`;

export const PromptInput = styled(CustomInput)`
    border: none;
    border: 1px solid var(--gray-500);
    border-radius: 0.75rem;
    padding-left: 1rem;
    resize: none;
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

export const StarsIcon = styled(BsStars)`
    box-sizing: content-box;
`;

export const GenerateButton = styled(Button)`
    border: none;
    height: 40px;
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.75rem;
    margin-left: auto;
`;

export const VideoWrapper = styled.div`
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    overflow: hidden;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    background-color: var(--indigo-950);
    flex: 1;
`;
