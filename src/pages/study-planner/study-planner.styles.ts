import styled from 'styled-components';

export const ModalContent = styled.div`
    display: flex;
    height: 550px;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    line-height: 1.8;
    padding: 1rem;
    color: #141414;
`;
const hexToRgb = (hex: string | undefined) => {
    if (!hex) {
        return;
    }
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};
export const TaskBoxContainer = styled.div`
    border-color: '#0369a1';
    background-color: rgba(${() => hexToRgb('#0369a1')}, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    width: 98%;
    border-style: solid;
    border-width: 0 0 0 6px;
    border-color: #0369a1;
    border-radius: 6px;
    padding: 10px;
    height: 100px;
    p {
        color: '#0369a1';
    }
`;

export const TasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 12px;
    width: 100%;
    padding: 0.3rem;
`;
