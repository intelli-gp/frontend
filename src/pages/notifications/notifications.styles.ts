import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    height: 100%;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

export const NotificationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: min(500px, 100%);
    margin: 0 auto;
    border-left: 1px solid var(--gray-200);
    border-right: 1px solid var(--gray-200);
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
    background-color: var(--gray-50);
`;
