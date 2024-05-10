import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'pomodoro',
    round: 1,
    autoBreaks: false,
    autoPomodoros: false,
    longBreakInterval: 3,
    timer: '25:00',
    isRunning: false,
};
export const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        setStartTimer: (state) => {
            state.isRunning = true;
          },
          setStopTimer: (state) => {
            state.isRunning = false;
          },
        incrementRound: (state) => {
            state.round += 1;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setTimer: (state, action) => {
            state.timer = action.payload;
        },
    },
});

export const { incrementRound, setMode, setTimer, setStartTimer, setStopTimer } = pomodoroSlice.actions;

export const pomodoroReducer = pomodoroSlice.reducer;
