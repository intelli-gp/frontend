import styled from 'styled-components';

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    line-height: 1.8;
    color: #141414;

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
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

type Color = {
    color?: string;
};

export const TaskBoxContainer = styled.div<Color>`
    border-color: ${(props) => props.color};
    background-color: rgba(${(props) => hexToRgb(props.color)}, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    width: 98%;
    border-style: solid;
    border-width: 0 0 0 6px;
    border-radius: 6px;
    padding: 10px;
    padding-right: 14px;

    p {
        color: ${(props) => props.color};
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

export const NoTasksContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    flex-direction: column;
    gap: 1rem;
`;
export const ButtonMV = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 3.8rem;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1.5rem;
    gap: 1rem;

    @media (min-width: 1024px) {
        display: none;
    }
`;
export const CalendarHolder = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media (min-width: 1024px) {
        flex-basis: 80%;
    }
`;

export const Searchbar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    padding-left: 8px;
    border-radius: 36px;
    background: #f4f4f5;
    border: 2px solid #f4f4f5;
    transition: background 0.25s;
    input {
        font-size: 0.875rem;
        margin-left: 8px;
        margin-right: 4px;
        background: transparent;
        outline: none;
        border: none;
        flex: 1;
    }
    &:focus-within {
        border: 2px solid #4f46e5;
    }
`;
