import styled from 'styled-components';

export const PageContainer = styled.div`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const SearchBarContainer = styled.div`
    width: 100%;
    border-radius: 99999px;
    border: 1px solid var(--gray-500);
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
`;
