import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 1150px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const GroupsGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    justify-content: center;
    gap: 1rem;
`;

export const SmallTitle = styled.p`
    margin-bottom: -1rem;
    font-size: 0.65rem;
    font-weight: bolder;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    user-select: none;
    display: flex;
    justify-content: space-between;
    color: var(--gray-700);
    border-bottom: 1px solid var(--gray-200);
`;
