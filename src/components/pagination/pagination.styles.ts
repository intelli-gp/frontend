import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;

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
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: 500;
    // TODO: do active color
    background-color: ${({ active }) => (active ? 'var(--indigo-200)' : '')};
    cursor: pointer;
    transition: color 0.3s;
    color: var(--indigo-800);

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
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    cursor: pointer;

    transition: color 0.3s;
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
