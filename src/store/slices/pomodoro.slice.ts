import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    mode: 'pomodoro',
    round: 1,
    autoBreaks: false,
    autoPomodoros: false,
    longBreakInterval: 3,
};
export const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        incrementRound: (state) => {
            state.round += 1;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { incrementRound, setMode } = pomodoroSlice.actions;

export const pomodoroReducer = pomodoroSlice.reducer;
