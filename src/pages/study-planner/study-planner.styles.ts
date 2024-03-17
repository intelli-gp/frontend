import styled from 'styled-components';

export const PageContainer = styled.div`
    .rbc-time-view .rbc-row:first-child {
        font-size: 1rem;
        min-height: 3rem !important;
        flex-grow: 3 !important;
    }
    .rbc-header {
        padding: 10px 0 0 0 !important;

        color: #1b2547;
        border-bottom: 0px solid !important;
        font-size: larger;
        font-weight: 400;
    }
    .rbc-header + .rbc-today {
        color: #312e81;
    }
    .rbc-label {
        color: #868e96;
    }
    .rbc-allday-cell {
        visibility: hidden !important;
        height: 0 !important;
    }
    .rbc-time-header-gutter {
        border-style: solid;

        border-width: 0 !important;
    }
    .rbc-today {
        background-color: #e9eafd;
    }

    .rbc-event {
        padding: 0px !important;
        border-radius: 0px !important;
        border: none !important;
        background-color: transparent !important;
        z-index: 2;
        position: relative;
    }

    .rbc-background-event {
        padding: 0px !important;
        border-radius: 0px !important;
        border: none !important;
        background-color: transparent !important;
    }

    .rbc-event-label {
        display: none !important;
    }

    .rbc-timeslot-group {
        min-height: 80px !important;
        border-color: transparent !important;
    }

    .rbc-events-container {
        @media (min-width: 1441px) {
            margin-right: 0px !important;
        }
    }
    input[type='time']::-webkit-calendar-picker-indicator {
        display: none;
    }
    .rbc-current-time-indicator {
        background-color: #312e81 !important;
    }

    .rbc-time-content::-webkit-scrollbar {
        width: 0.4rem;
    }
    .rbc-time-content::-webkit-scrollbar-track {
        background: transparent;
    }
    .rbc-time-content::-webkit-scrollbar-thumb {
        background: var(--gray-300);
    }

    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    @media (min-width: 1280px) {
        flex-direction: row;
    }
`;
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

export const TaskBoxContainer = styled.div<{ color?: string }>`
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
    & > div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
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
export const SideNav = styled.div`
    display: flex;
    flex-basis: 18%;
    height: 100%;
    flex-direction: column;
    border-left: 2px solid #cbd5e0;
    padding: 1.8rem;
    @media (max-width: 1024px) {
        display: none;
    }
    & > div:first-child {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        justify-items: center;
        justify-content: center;
        width: 100%;
    }
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

    @media (min-width: 1250px) {
        display: none;
    }
`;
export const CalendarHolder = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media (min-width: 1025px) {
        flex-basis: 82%;
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
export const LeftButton = styled.button`
    width: 25%;
    background-color: var(--indigo-900);
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: 1px solid white;
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const MiddleButton = styled.button`
    width: 50%;
    background-color: var(--indigo-900);
    color: white;
    font-size: 0.75rem;
    padding: 5px;

    @media (min-width: 768px) {
        font-size: 0.875rem;
    }
`;
export const RightButton = styled.button`
    width: 25%;
    padding: 8px;
    background-color: var(--indigo-900);
    border-left: 1px solid white;
    border-radius: 0 0.5rem 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
