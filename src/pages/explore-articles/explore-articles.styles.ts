import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
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

export const MainContent = styled.main<{ empty?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    ${({ empty }) => {
        return (
            empty &&
            css`
                &:after {
                    content: 'No Results Found!';
                    width: 100%;
                    height: 200px;
                    font-size: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0.5;
                }
            `
        );
    }}
`;
