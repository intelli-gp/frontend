import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { GoDash, GoDotFill } from 'react-icons/go';

import {
    ModalContent,
    StatusContainer,
    StatusIcon,
    StatusInput,
    StatusItem,
} from '../pages/study-planner/study-planner.styles';
import { useAddTasksMutation } from '../store';
import { Task, sendTask } from '../types/event';
import { errorToast, successToast } from '../utils/toasts';
import Button from './button/button.component';
import { CustomInput } from './input/Input.component';
import { Modal } from './modal/modal.component';

type ModalProps = {
    Tasks: Task[];
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type Status = {
    color: string;
    status: string;
};
export const AddTaskModal: React.FC<ModalProps> = ({
    Tasks,
    showModal,
    setShowModal,
}) => {
    let currentDate = new Date();

    const statuses: Status[] = [
        {
            color: '#1F51FF',
            status: 'In Progress',
        },
        {
            color: '#495057',
            status: 'Hold',
        },
        {
            color: '#008200',
            status: 'Done',
        },
    ];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#0369a1');
    const [statusColor, setStatusColor] = useState('#1F51FF');

    const [due_date, setDueDate] = useState(
        moment(currentDate).format().slice(0, 10),
    );
    const [due_start, setDueStart] = useState(
        moment(currentDate).format().slice(11, 16),
    );
    const [due_end, setDueEnd] = useState(
        moment(currentDate).add(1, 'hours').format().slice(11, 16),
    );
    const [status, setStatus] = useState('     In Progress');
    const [statusIsRunning, setStatusIsRunning] = useState(false);

    const handleDueStartChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newDueStart = event.target.value;
        setDueStart(newDueStart);
        if (newDueStart > due_end) {
            setDueEnd(newDueStart);
        }
    };

    const handleDueEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDueEnd = event.target.value;
        if (newDueEnd >= due_start) {
            setDueEnd(newDueEnd);
        }
    };

    const [
        createTask,
        {
            isSuccess: isTaskCreatedSuccessfully,
            isError: isTaskCreateError,
            isLoading: isTaskCreating,
            error: taskCreateError,
        },
    ] = useAddTasksMutation();
    useEffect(() => {
        if (isTaskCreateError) {
            errorToast('Error creating a task!', taskCreateError as string);
        }
        if (isTaskCreatedSuccessfully) {
            successToast('Task created successfully!');
        }
    }, [isTaskCreatedSuccessfully, isTaskCreateError]);
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            const customInputForm =
                document.querySelector('.custom-input-form');
            if (customInputForm && !customInputForm.contains(event.target)) {
                setStatusIsRunning(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const StartDateTime = new Date(`${due_date}T${due_start}`);
        const EndDateTime = new Date(`${due_date}T${due_end}`);
        const nowDate = new Date();
        const differenceInMonths = moment(StartDateTime)
            .add(1, 'days')
            .diff(moment(nowDate), 'months');
        if (differenceInMonths >= 1) {
            errorToast('Date exceeds 1 month ahead!');
            return;
        }
        if (due_start === due_end) {
            errorToast('Start and due date can not match!');
            return;
        }

        if (StartDateTime < nowDate) {
            errorToast('This is an old date!!');
            return;
        }
        for (const task of Tasks) {
            if (task.DueDate && task.StartDate) {
                const taskStartDate = new Date(task.StartDate);
                const taskDueDate = new Date(task.DueDate);
                // if start date is in the interval of other task
                if (
                    StartDateTime >= taskStartDate &&
                    StartDateTime < taskDueDate
                ) {
                    errorToast(
                        'Task start time overlaps with another task. Please choose a different time.',
                    );
                    return;
                }

                // if end date is in the interval of other task
                if (EndDateTime >= taskStartDate && EndDateTime < taskDueDate) {
                    errorToast(
                        'Task end time overlaps with another task. Please choose a different time.',
                    );
                    return;
                }
                // if some other task interval is inside this interval
                if (
                    StartDateTime <= taskStartDate &&
                    EndDateTime >= taskStartDate &&
                    EndDateTime >= taskDueDate
                ) {
                    errorToast(
                        'Task duration overlaps with another task. Please adjust the start or end time.',
                    );

                    return;
                }
            }
        }

        const task: Partial<sendTask> = {
            Title: title,
            Description: description,
            DueDate: due_date + 'T' + due_end,
            StartDate: due_date + 'T' + due_start,
            Status: status,
            Color: color,
        };

        await createTask(task as sendTask).unwrap();
        setShowModal(false);
        setTitle('');
        setDescription('');
        setDueDate(moment(currentDate).format().slice(0, 10));
        setDueStart(moment(currentDate).format().slice(11, 16));
        setDueEnd(moment(currentDate).add(1, 'hours').format().slice(11, 16));
        setColor('#0369a1');
        setStatus('      In Progress');
        setStatusColor('#1F51FF');
    };

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            title={'Add task'}
            width="lg"
        >
            <ModalContent>
                <form onSubmit={handleSubmitForm}>
                    <div className="w-full">
                        <CustomInput
                            required
                            label="Task name"
                            type="text"
                            value={title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setTitle(e.target?.value)
                            }
                        />
                    </div>
                    <div className="flex w-full justify-between pt-[6px] gap-6">
                        <div className="w-1/2 relative">
                            <StatusIcon size={24} color={statusColor} />
                            <StatusInput
                                required
                                color={statusColor}
                                label="Status"
                                type="text"
                                className="custom-input-form"
                                value={status}
                                onClick={() => {
                                    setStatusIsRunning(true);
                                }}
                            />
                            {statusIsRunning && (
                                <StatusContainer>
                                    {statuses.map((status) => (
                                        <StatusItem
                                            onClick={() => {
                                                setStatus(
                                                    '      ' + status.status,
                                                );
                                                setStatusColor(status.color);
                                            }}
                                        >
                                            <GoDotFill
                                                size={24}
                                                color={status.color}
                                            />
                                            <span>{status.status}</span>
                                        </StatusItem>
                                    ))}
                                </StatusContainer>
                            )}
                        </div>
                        <div className="w-1/2">
                            <CustomInput
                                required
                                label="Select color"
                                id="color"
                                className="rounded border  border-slate-400 p-2 w-full h-[49px] bg-white focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                type="color"
                                value={color}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setColor(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-between pt-[6px] gap-6">
                        <div className="w-1/2 flex flex-col justify-between">
                            <CustomInput
                                required
                                value={due_date}
                                type="date"
                                label="Due date"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDueDate(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-row justify-between w-1/2 mt-auto">
                            <input
                                type="time"
                                className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 mr-1"
                                value={due_start}
                                onChange={handleDueStartChange}
                            />
                            <span className="text-xl pt-3">
                                <GoDash />
                            </span>
                            <input
                                type="time"
                                className="rounded border ml-1 border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                value={due_end}
                                onChange={handleDueEndChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-[6px]">
                        <CustomInput
                            label="Description"
                            value={description}
                            onChange={(e: { target: { value: any } }) =>
                                setDescription(e.target.value)
                            }
                            multiline="true"
                            placeholder="Enter description..."
                            maxLength={1000}
                            cols={33}
                            rows={4}
                        />
                    </div>
                    <div className="w-full flex flex-row gap-4 justify-end items-end pt-5">
                        <Button
                            type="submit"
                            select="primary"
                            className="w-1/4"
                            loading={isTaskCreating}
                        >
                            Create
                        </Button>
                        <Button
                            select="danger"
                            outline={true}
                            onClick={() => setShowModal(false)}
                            className="w-1/4 border-white"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    );
};
