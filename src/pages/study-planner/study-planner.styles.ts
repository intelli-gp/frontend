import styled from 'styled-components';

export const ModalContent = styled.div`
    display: flex;
    height: 500px;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    line-height: 1.8;
    padding: 1.6rem;
    color: #141414;
`;

export const TaskBoxContainer = styled.div`
    border-color: #0369a1;
    background: #dbeaf2;
    height: 100%;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    width: 98%;
    border-style: solid;
    border-width: 0 0 0 6px;
    padding: 10px;
    border-radius: 6px;
`;
export const TasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #e0e0e0;
    min-height: 158px;
    border-radius: 0.375rem;
    padding: 0.5rem;
`;
