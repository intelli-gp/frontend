import styled from 'styled-components';

export const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    inset:0;
`;

export const ModalWrapper = styled.div`
    width: 600px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    z-index: 10;
    border-radius: 10px;
    padding: 2.5rem;
`;
