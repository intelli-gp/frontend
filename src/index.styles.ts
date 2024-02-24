import styled from 'styled-components';

export const PageTitle = styled.h1`
    line-height: 1.25;
    font-weight: 900;
    font-size: 3rem;
    color: var(--gray-800);

    @media (max-width: 768px) {
        line-height: 0.9;
    }
`;

export const ModalTitle = styled.h2`
    font-weight: 900;
    font-size: 2.5rem;
    color: var(--gray-800);
`;
