import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    round: 1,
    autoBreaks: false,
    autoPomodoros: false,
    longBreakInterval: 4
}
export const pomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        incrementRound: (state) => {
            state.round += 1;
          }
    }
})

export const {
    incrementRound,
  } = pomodoroSlice.actions;
  
  export const pomodoroReducer = pomodoroSlice.reducer;