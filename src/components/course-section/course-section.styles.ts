import styled from 'styled-components';

export const CourseSectionContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const CourseSectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray-200);

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0rem;
    }
`;

export const CourseSectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
`;

export const RedirectText = styled.p`
    cursor: pointer;
    font-size: 0.85;
    transition: opacity 0.2s ease-in-out;
    align-self: flex-end;
    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        margin-top: -0.5rem;
    }
`;
