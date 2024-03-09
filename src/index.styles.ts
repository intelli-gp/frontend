import styled from 'styled-components';

export const PageTitle = styled.h1`
    user-select: none;
    line-height: 1.25;
    font-weight: 700;
    font-size: 2.75rem;
    color: var(--gray-800);

    @media (max-width: 768px) {
        line-height: 0.9;
    }
`;

export const ModalTitle = styled.h2`
    user-select: none;
    font-weight: 700;
    font-size: 2.5rem;
    color: var(--gray-800);
`;
