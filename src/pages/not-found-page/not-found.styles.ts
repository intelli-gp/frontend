import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const PageContainer = styled(motion.div)`
    display: flex;

    flex-direction: row;
    height: 100vh;
    align-items: center;
    justify-content: space-between;
    background: var(--indigo-50);
    padding: 6.5rem;

    @media (max-width: 768px) {
        padding: 3rem;
    }
`;
export const Title = styled.h1`
    font-size: 3.2rem;
    font-weight: bold;
    color: var(--indigo-950);
`;
