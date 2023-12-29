

import React from 'react';
import { TaskBoxContainer } from './study-planner.styles';
interface TaskProps {
    children?: React.ReactNode;
    courseName?:string;
    taskTitle?:string;

}

export default function TaskBox({
    children,
    courseName,
    taskTitle
}: TaskProps): JSX.Element {
    return <TaskBoxContainer>
        {children}
        <div>
            <p className="text-xs text-[#0369A1]">
               {courseName} {' '}
                <span className="text-xs text-[#0369A1] opacity-50">
                    {taskTitle}
                </span>
            </p>
        </div>

    </TaskBoxContainer>;

}