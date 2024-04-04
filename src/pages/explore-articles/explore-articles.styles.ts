import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;
