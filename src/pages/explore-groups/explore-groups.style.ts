import styled from 'styled-components';

export const PageContainer = styled.div`
    margin: 0 auto;
    padding: 2rem;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

export const GroupsGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    justify-content: center;
    gap: 2rem;
`;
