import { createSlice } from '@reduxjs/toolkit';

const taskFormSlice = createSlice({
    name: 'task-form',
    initialState: {
        title: '',
        description: '',
        color: '#00ff00',
        due_date: '',
        due_start: '13:00',
        due_end: '14:00',
    },
    reducers: {
        changeTaskTitle(state, action) {
            state.title = action.payload;
        },
        changeTaskDescription(state, action) {
            state.description = action.payload;
        },
        changeTaskColor(state, action) {
            state.color = action.payload;
        },
        changeTaskDueDate(state, action) {
            state.due_date = action.payload;
        },
        changeTaskDueStart(state, action) {
            state.due_start = action.payload;
        },
        changeTaskDueEnd(state, action) {
            state.due_end = action.payload;
        },
        resetTaskFrom(state) {
            state.title = '';
            state.description = '';
            state.color = '#00ff00';
            state.due_date = '';
            state.due_start = '13:00';
            state.due_end = '14:00';
        },
    },
});

export const taskFormReducer = taskFormSlice.reducer;
export const {
    changeTaskTitle,
    changeTaskDescription,
    changeTaskColor,
    changeTaskDueDate,
    changeTaskDueStart,
    changeTaskDueEnd,
    resetTaskFrom,
} = taskFormSlice.actions;
