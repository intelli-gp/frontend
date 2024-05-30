import styled from 'styled-components';

export const CourseSearchResultsPageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    width: min(100%, 1200px);
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }

    #container {
        margin: 1rem;
    }

    .items {
        margin-bottom: 1rem;
    }
`;

export const CourseSearchPageHeader = styled.div`
    width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;
