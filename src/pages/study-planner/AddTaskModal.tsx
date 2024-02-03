import { ChangeEvent, useEffect, useState } from 'react';
import { GoDash } from 'react-icons/go';

import Button from '../../components/Button';
import { InputWithLabel } from '../../components/Input';
import { Modal } from '../../components/modal/modal.component';
import { useAddTasksMutation } from '../../store';
import { Task } from '../../types/event';
import './Calendar.styles.css';
import { ModalContent } from './study-planner.styles';
import { errorToast, successToast } from '../../utils/toasts';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
// type Status = {
//     icon: JSX.Element;
//     status: string;
// };
export const AddTaskModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
}) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    // const statuses: Status[] = [
    //     {
    //       icon: <></>,
    //       status: "In Progress",
    //     },
    //     {
    //       icon:<> </>,
    //       status: "Hold",
    //     },
    //     {
    //       icon: <></>,
    //       status: "Done",
    //     },
    //   ];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#0369a1');
    const [due_date, setDueDate] = useState(currentDate);
    const [due_start, setDueStart] = useState('13:00');
    const [due_end, setDueEnd] = useState('14:00');
    const [status, setStatus] = useState('');


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

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task: Partial<Task> = {
            Title: title,
            Description: description,
            Color: color,
            DueEnd: due_date + 'T' + due_end,
            DueDate:due_date + 'T' + due_end,
            DueStart: due_date + 'T' + due_start,
            Status: status,
        };


            await createTask(task as Task).unwrap();
            setShowModal(false);
            setTitle('');
            setDescription('');
            setDueDate(currentDate);
            setDueStart('13:00');
            setDueEnd('14:00');
            setColor('#0369a1');
            setStatus('');
    
    };

    return (
        <div className="flex justify-between h-[100vh]">
            <Modal isOpen={showModal} setIsOpen={setShowModal}>
                <ModalContent>
                    <h1 className="text-3xl font-semibold text-txt">
                        {' '}
                        Add Task{' '}
                    </h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className="w-full">
                            <InputWithLabel
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
                            <div className="w-1/2">
                                <InputWithLabel
                                    required
                                    label="Status"
                                    type="text"
                                    value={status}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => setStatus(e.target.value)}
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => setColor(e.target.value)}
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => setDueDate(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-row justify-between pt-9 w-1/2">
                                <input
                                    type="time"
                                    className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 mr-1"
                                    value={due_start}
                                    onChange={(e) =>
                                        setDueStart(e.target.value)
                                    }
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
                                outline={true}
                                onClick={() => setShowModal(false)}
                                className="w-1/5 border-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                select="primary"
                                className="w-2/5"
                                loading={isTaskCreating}

                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};
