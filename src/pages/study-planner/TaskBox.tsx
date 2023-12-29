

import React from 'react';
import { TaskBoxContainer } from './study-planner.styles';
interface TaskProps {
    children?: React.ReactNode;

}

export default function TaskBox({
    children

}: TaskProps): JSX.Element {
    return <TaskBoxContainer>
        {children}
        <div>
            <p className="text-xs text-[#0369A1]">
                Math |{' '}
                <span className="text-xs text-[#0369A1] opacity-50">
                    Assignment
                </span>
            </p>
        </div>

    </TaskBoxContainer>;

}