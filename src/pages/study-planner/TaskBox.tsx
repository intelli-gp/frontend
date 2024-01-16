import { TaskBoxContainer } from './study-planner.styles';

interface TaskProps {
    title?: string;
    status?: string;
    description?: string;
    due_date?: string;
    start?: string;
    end?: string;
    color?: string;
}

export default function TaskBox({
    start,
    end,
    title,
    status,
    description,
    due_date,
    color,
}: TaskProps): JSX.Element {
    return (
        <TaskBoxContainer color={color}>
            <div className="flex flex-col justify-between items-left">
                <p className="text-xs ">
                    <span>{start}</span>
                    <span>{end}</span>
                </p>
                <p className="text-xs text-[#0369A1]">
                    {title} <span className="text-xs opacity-50">{status}</span>
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
