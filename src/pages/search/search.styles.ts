import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const PageContainer = styled(motion.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`;

export const SearchPageSection = styled.div<{ empty?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
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

export const SectionTitle = styled.p`
    font-size: 1.25rem;
    font-weight: bolder;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: end;
    color: var(--gray-700);
    border-bottom: 1px solid var(--gray-200);
`;

export const ArticleSectionBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const ExploreMoreLink = styled(Link)`
    color: inherit;
    letter-spacing: normal;
    font-size: 0.8rem;
    font-weight: 500;
    &:hover {
        color: black;
        text-decoration: underline;
    }
`;
