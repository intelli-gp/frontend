
import { TaskBoxContainer } from './study-planner.styles';


interface TaskProps {
    id?: any;
    title?: string;
    course?: string;
    status?: string;
    description?: string;
    due_date?: string;
    start?: string;
    end?: string;
    color?: string;
    DueDate?: string;
    StartDate?: string;
}

export default function TaskBox({
    id,
    title,
    status,
    description,
    due_date,
    color,
    StartDate,
    DueDate,
}: TaskProps): JSX.Element {

    return (
        <div>
           
            <TaskBoxContainer color={color}>
                <div className="flex flex-col justify-between items-left">
                    <p className="text-sm text-[#0369A1] ">
                        {title}{' '}
                        <span className="text-sm opacity-50">{status}</span>
                    </p>
                    <p className="text-[13px] pt-[3px] text-[#0369A1]">
                        {description}
                    </p>
                    <div className="pt-6">
                        <p className="text-[10px] pt-[2px] text-[#0369A1] opacity-50">
                            {due_date}
                        </p>
                    </div>
                </div>
            </TaskBoxContainer>
        </div>
    );
}
