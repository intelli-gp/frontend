import styled from 'styled-components';

export const CenterElement = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;
type TimerModesProps = {
    mode: string;
};

export const PomodoroContainer = styled.div<TimerModesProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 3rem 1rem;
    border-radius: 6px;
    height: 80%;
    width: 90%;
    margin: auto;
    transition: background 0.5s ease-in-out;
    background-color: ${({ mode }) =>
        mode === 'pomodoro'
            ? '#DA534F'
            : mode === 'shortBreak'
              ? ' rgb(56, 133, 138)'
              : '#6366F1'};
    @media (max-width: 768px) {
        height: 80vh;
    }
    p {
        font-family: 'Lilita One', sans-serif;
        font-size: 1.75rem;
        font-weight: 400;
        color: white;
        opacity: 0.6;
    }
`;
export const ModesContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
type Active = {
    active: string;
};

export const ModeButton = styled.button<Active>`
    background-color: transparent;
    ${({ active }) =>
        active === 'true' && 'background: rgba(84, 57, 57, 0.24);'}
    border: none;
    color: #fff;
    font-size: 1.1rem;
    padding: 2px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
`;
export const Timer = styled.h1`
    font-size: 6rem;
    color: #fff;
    font-weight: 700;
    font-family: 'Lilita One', sans-serif;
    letter-spacing: 4px;
`;
export const ControlButton = styled.button<TimerModesProps>`
    padding: 5px;
    background-color: #fff;
    font-size: 1.6rem;
    font-family: 'Lilita One', sans-serif;
    width: 215px;
    border-radius: 6px;
    transition: color 0.5s ease-in-out;
    color: ${({ mode }) =>
        mode === 'pomodoro'
            ? '#DA534F'
            : mode === 'shortBreak'
              ? ' rgb(56, 133, 138)'
              : '#6366F1'};
`;
