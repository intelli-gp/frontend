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
    border-color: ${(props) => props.color};
    background-color: rgba(${(props) => hexToRgb(props.color)}, 0.2);
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

    p {
        color: ${(props) => props.color || '#0369a1'};
    }
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
