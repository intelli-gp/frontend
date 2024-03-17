import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    padding: 4rem;
    position: relative;
    display: flex;
    gap: 3rem;
    flex-direction: column;

    @media (max-width: 768px) {
        padding: 4rem 2rem;
    }
    @media (max-width: 426px) {
        padding: 4rem 1rem;
    }
`;
