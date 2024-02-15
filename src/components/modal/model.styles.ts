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
    width: 600px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    border-radius: 10px;
    padding: 2rem 3.5rem;
    @media (max-width: 500px) {
        margin: 5rem 0rem 0rem 0rem;
    }
`;
