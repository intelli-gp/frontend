import React from 'react';

import { TaskBoxContainer } from './study-planner.styles';

interface TaskProps {
    children?: React.ReactNode;
    courseName?: string;
    taskTitle?: string;
    description?: string;
    due_date?: string;
}

export default function TaskBox({
    children,
    courseName,
    taskTitle,
    description,
    due_date,
}: TaskProps): JSX.Element {
    return (
        <TaskBoxContainer>
            {children}
            <div className="flex flex-col justify-between items-left">
                <p className="text-xs text-[#0369A1]">
                    {courseName}{' '}
                    <span className="text-xs text-[#0369A1] opacity-50">
                        {taskTitle}
                    </span>
                </p>
                <p className="text-sm pt-[2px] text-[#0369A1]">{description}</p>
                <div className="pt-6">
                    <p className="text-[12px] pt-[2px] text-[#0369A1] opacity-50">
                        {due_date}
                    </p>
                </div>
            </div>
        </TaskBoxContainer>
    );
}
