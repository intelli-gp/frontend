import { useEffect, useRef, useState } from 'react';
import { GoDash } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';

import Button from '../../components/Button';
import { InputWithLabel } from '../../components/Input';
import { Background, ModalWrapper } from '../../components/modal/model.styles';
import { useEditTaskMutation, useRemoveTaskMutation } from '../../store';
import { Task } from '../../types/event';
import { TaskBoxContainer } from './study-planner.styles';
import { ModalContent } from './study-planner.styles';

interface ModalProps {
    task: TaskProps;
}
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
    // TODO: Remove this const to its component
    const EditTaskModal: React.FC<ModalProps> = ({ task }) => {
        const id = task.id;
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [color, setColor] = useState('#000ff3');
        const [due_date, setDueDate] = useState('');
        const [due_start, setDueStart] = useState('00:00');
        const [due_end, setDueEnd] = useState('00:00');
        const [status, setStatus] = useState('');

        useEffect(() => {
            setTitle(task?.title ? task.title.replace('|', '') : '');
            setDescription(task?.description || '');
            setColor(task?.color || '#000ff3');
            setDueDate(task?.DueDate ? task?.DueDate.slice(0, 10) : '');
            setDueStart(task?.StartDate ? task?.StartDate.slice(11, 16) : '');
            setDueEnd(task?.DueDate ? task?.DueDate.slice(11, 16) : '');
            setStatus(task?.status || '');
        }, [task]);

        const [removeTask, t] = useRemoveTaskMutation();
        const [addTask, a] = useEditTaskMutation();

        const handleDelete = () => {
            const task: Partial<Task> = {
                id: id,
                title: title,
                description: description,
                color: color,
                due_end: due_date + 'T' + due_end,
                due_date: due_date,
                due_start: due_date + 'T' + due_start,
                status: status,
            };

            try {
                console.log(t);
                removeTask(task as Task);
                setModalOpen(false);
            } catch (err) {
                console.log(err);
            }
        };
        const handleSubmitForm = () => {
            const task: Partial<Task> = {
                id: id,
                title: title,
                description: description,
                color: color,
                due_end: due_date + 'T' + due_end,
                due_date: due_date,
                due_start: due_date + 'T' + due_start,
                status: status,
            };
            console.log(a);
            addTask(task as Task);
            setModalOpen(false);
        };

        return (
            // TODO: Solve the modal issue and make the status dropdown.

            <ModalContent>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold text-txt">
                        {' '}
                        Edit Task{' '}
                    </h1>
                    <IoClose onClick={() => setModalOpen(false)} size="20px" />
                </div>
                <div>
                    <div className="w-full">
                        <InputWithLabel
                            required
                            label="Task name"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full justify-between pt-[6px] gap-6">
                        <div className="w-1/2">
                            <InputWithLabel
                                required
                                label="Status"
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputWithLabel
                                required
                                label="Select color"
                                id="color"
                                className="rounded border  border-slate-400 p-2 w-full h-[49px] bg-white focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-between pt-[6px] gap-6">
                        <div className="w-1/2 flex flex-col justify-between">
                            <InputWithLabel
                                required
                                value={due_date}
                                type="date"
                                label="Due date"
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row justify-between pt-9 w-1/2">
                            <input
                                type="time"
                                className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 mr-1"
                                value={due_start}
                                onChange={(e) => setDueStart(e.target.value)}
                            />
                            <span className="text-xl pt-3">
                                <GoDash />
                            </span>
                            <input
                                type="time"
                                className="rounded border ml-1 border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                value={due_end}
                                onChange={(e) => setDueEnd(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-[6px]">
                        <label htmlFor="description" className="font-bold">
                            Description:
                        </label>
                        <textarea
                            required
                            className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description..."
                            maxLength={1000}
                            cols={33}
                            rows={4}
                        />
                    </div>
                    <div className="w-full flex flex-row gap-4 justify-end items-end pt-5">
                        <Button
                            type="button"
                            select="primary"
                            className="w-[25%] border-2 border-indigo-900 "
                            onClick={handleSubmitForm}
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            select="danger"
                            outline={true}
                            onClick={handleDelete}
                            className="w-[25%]"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </ModalContent>
        );
    };

    const ref = useRef<HTMLDivElement>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    useOnClickOutside(ref, () => setModalOpen(false));

    function useOnClickOutside(ref: any, handler: any) {
        useEffect(() => {
            const listener = (event: { target: any }) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        }, [ref, handler]);
    }
    const task = {
        id,
        StartDate,
        DueDate,
        title,
        status,
        description,
        due_date,
    };
    return (
        <div>
            {isModalOpen ? (
                <div ref={ref} className="flex justify-between h-[100vh] ">
                    <Background>
                        <ModalWrapper>
                            <EditTaskModal task={task} />
                        </ModalWrapper>
                    </Background>
                </div>
            ) : (
                <></>
            )}
            <TaskBoxContainer color={color} onClick={() => setModalOpen(true)}>
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
