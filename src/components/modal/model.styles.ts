import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Background = styled(motion.div)`
    inset: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    inset: 0;
`;

export const ModalWrapper = styled(motion.div)`
    user-select: none;
    max-width: 600px;
    max-height: 95vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 0.75rem;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
        max-width: 400px;
    }
`;
