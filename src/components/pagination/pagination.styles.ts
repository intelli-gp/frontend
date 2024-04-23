import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 2rem;

    @media (max-width: 425px) {
        transform: scale(0.9);
        margin-bottom: 4.5rem;
    }
`;

export const PageNumberContainer = styled.ul`
    display: flex;
    gap: 1rem;
`;

export const PageNumber = styled.div<{ active?: boolean }>`
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 1rem;
    font-weight: 500;
    // TODO: do active color
    background-color: ${({ active }) => (active ? 'var(--indigo-200)' : '')};
    transition: all 0.2s ease-in-out;
    color: var(--indigo-800);
    cursor: pointer;

    &:hover {
        background-color: var(--indigo-200);
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        width: 1.5rem;
        height: 1.5rem;
    }
`;

export const ActionButtonsContainer = styled.div`
    display: flex;
    gap: -2rem;
`;

export const ActionButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: var(--indigo-800);

    &:hover {
        background-color: var(--indigo-200);
    }
    &:disabled {
        color: var(--gray-500);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        width: 1.5rem;
        height: 1.5rem;
    }
`;
