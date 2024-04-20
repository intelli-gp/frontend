import styled from 'styled-components';

export const CourseSectionContainer = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const CourseSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

export const CourseSectionTitle = styled.h2`
    font-size: 2.2rem;
`;

export const RedirectText = styled.p`
    text-decoration: underline;
    color: var(--gray-800);
    font-weight: bold;
    cursor: pointer;
    font-size: 1.1rem;
    transition: opacity 0.2s ease-in-out;
    &:hover {
        opacity: 0.8;
    }
`;
