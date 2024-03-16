import styled from 'styled-components';

import Button from '../button/button.component';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    height: 180px;
    width: 100%;
    padding: 18px;
    border-radius: 10px;
    background-color: var(--gray-100);
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--indigo-50);
    }
`;

export const CardImageContainer = styled.div`
    width: 30%;
    min-height: 100%;
    max-height: 100%;
`;

export const CardImage = styled.img`
    width: 100%;
    min-height: 130px;
    max-height: 130px;
    object-fit: cover;
    border-radius: 10px;
`;

export const GroupTitle = styled.h3`
    color: var(--gray-700);
    font-weight: bold;
    font-size: 1.5rem;
    @media (max-width: 568px) {
        font-size: 1.21rem;
    }
`;
export const TypographyContainer = styled.div`
    display: flex;
    width: 38%;
    gap: 12px;
    height: 100%;
    flex-direction: column;
    align-content: flex-start;
`;
export const TagsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0 0.5rem;
`;
export const ButtonsContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
`;
export const ViewButton = styled(Button)`
    padding: 0.25rem 2rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    transition: all 0.25s ease-in-out;
    &:hover {
        background-color: var(--indigo-950);
    }
    @media (max-width: 568px) {
        padding: 0.2rem 1rem;
        font-size: 0.8rem;
    }
`;

export const ExitButton = styled(Button)`
    padding: 0.25rem 2rem;
    border-radius: 0.5rem;
    transition: all 0.25s ease-in-out;
    @media (max-width: 568px) {
        padding: 0.2rem 1rem;
        font-size: 0.8rem;
    }
`;
