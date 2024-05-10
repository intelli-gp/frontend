import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'pomodoro',
    round: 1,
    autoBreaks: false,
    autoPomodoros: false,
    longBreakInterval: 3,
    isRunning: false,
    minutes:25,
    seconds:0,
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
        setMinutes: (state, action) => {
            state.minutes = action.payload;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
    },
});

export const { incrementRound, setMode,setMinutes, setSeconds, setStartTimer, setStopTimer } = pomodoroSlice.actions;

export const pomodoroReducer = pomodoroSlice.reducer;
