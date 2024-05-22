import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
`;

export const CardsOuterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 2rem;
`;

export const CardsInnerContainer = styled.div`
    gap: 2rem;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
