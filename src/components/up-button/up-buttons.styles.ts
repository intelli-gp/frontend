import { motion } from 'framer-motion';
import styled from 'styled-components';

export const UpButtonContainer = styled(motion.button)`
    z-index: 1000;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--indigo-500);
    color: white;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
        box-shadow: var(--tag-shadow);
    }

    @media (max-width: 600px) {
        bottom: 1rem;
        right: 0.5rem;
    }
`;