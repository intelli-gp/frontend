import moment from 'moment';

import { Task } from '../types/event';

export const getEditTask = (task: Task, existingTask: Task): Partial<Task> => {
    const updatedTask: Partial<Task> = {};
    updatedTask.ID = task.ID;
    if (task.Title !== existingTask.Title) {
        updatedTask.Title = task.Title;
    }

    if (task.Description !== existingTask.Description) {
        updatedTask.Description = task.Description;
    }

    const existingDueDateTime = moment(existingTask.DueDate)
        .format()
        .slice(0, 16);
    const existingStartDateTime = moment(existingTask.StartDate)
        .format()
        .slice(0, 16);

    if (
        task.DueDate !== existingDueDateTime ||
        task.StartDate !== existingStartDateTime
    ) {
        updatedTask.DueDate = task.DueDate;
        updatedTask.StartDate = task.StartDate;
    }
    if (task.Status !== existingTask.Status) {
        updatedTask.Status = task.Status;
    }

    return updatedTask;
};
