import { createSlice } from '@reduxjs/toolkit';

const taskFormSlice = createSlice({
    name: 'task-form',
    initialState: {
        title: '',
        description: '',
        color: '',
        due_date: '',
        due_time: '',
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
        changeTaskDueTime(state, action) {
            state.due_time = action.payload;
        },
        resetTaskFrom(state) {
            state.title = '';
            state.description = '';
            state.color = '';
            state.due_date = '';
            state.due_time = '';
        },
    },
});

export const taskFormReducer = taskFormSlice.reducer;
export const {
    changeTaskTitle,
    changeTaskDescription,
    changeTaskColor,
    changeTaskDueDate,
    changeTaskDueTime,
    resetTaskFrom,
} = taskFormSlice.actions;
