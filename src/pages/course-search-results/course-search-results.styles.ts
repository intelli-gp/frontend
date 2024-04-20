import styled from 'styled-components';


export const CourseSearchPageTitle = styled.h1`
    user-select: none;
    line-height: 1.25;
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: -1.5px;
`;

export const CourseSearchResultsPageContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

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
    gap: 1rem;
    padding-top: 1.5rem;
`;


