import styled from 'styled-components';

export const Background = styled.div`
    inset: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    inset: 0;
`;

export const ModalWrapper = styled.div`
    user-select: none;
    width: 600px;
    max-height: 95vh;
    overflow-y: auto;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    border-radius: 0.75rem;
    padding: 1.5rem 3.5rem;
    @media (max-width: 500px) {
        margin: 5rem 0rem 0rem 0rem;
    }
    /* width */
    &::-webkit-scrollbar {
        width: 0.4rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        width: 0.5rem;
        background: rgba(0, 0, 0, 0.1);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: var(--gray-400);
        opacity: 0.2;
        border-radius: 0.4rem;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb:hover {
        background: var(--gray-500);
        opacity: 0.2;
        border-radius: 0.4rem;
    }
`;
