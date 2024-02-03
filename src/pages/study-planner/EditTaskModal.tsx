import { GoDash } from 'react-icons/go';
import Button from '../../components/Button';
import { InputWithLabel } from '../../components/Input';
import { useEditTaskMutation, useRemoveTaskMutation,useFetchTaskQuery } from '../../store';
import { Task } from '../../types/event';
import { ModalContent } from './study-planner.styles';
import { SetStateAction, useEffect, useState } from 'react';
import { Modal } from '../../components/modal/modal.component';
import moment from 'moment';
import { errorToast, successToast } from '../../utils/toasts';

interface ModalProps {
    ID: number;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditTaskModal: React.FC<ModalProps> = ({ showModal,
    setShowModal, ID }) => {
    const { data: getTasks} = useFetchTaskQuery(ID);
    const task = getTasks?.data || [];

    const id = ID;
    const [title, setTitle] = useState(task?.Title);
    const [description, setDescription] = useState(task.Description);
    const [color, setColor] = useState(task?.Color || '#000ff3');
    const [due_date, setDueDate] = useState(moment(task.DueDate).format().slice(0,10));
    const [due_start, setDueStart] = useState(moment(task.StartDate).format().slice(11, 16));
    const [due_end, setDueEnd] = useState(moment(task.DueDate).format().slice(11, 16));
    const [status, setStatus] = useState(task?.Status || '');

    useEffect(() => {
        setTitle(task?.Title || '');
        setDescription(task?.Description || '');
        setColor(task?.Color || '#000ff3');
        setDueDate(task?.DueDate ? moment(task.DueDate).format().slice(0,10) : '');
        setDueStart(task?.StartDate ? moment(task.StartDate).format().slice(11, 16) : '');
        setDueEnd(task?.DueDate ? moment(task.DueDate).format().slice(11, 16) : '');
        setStatus(task?.Status || '');
    }, [task]);

    const [
        editTask,
        {
            isSuccess: isTaskEditedSuccessfully,
            isError: isTaskEditError,
            isLoading: isTaskEditing,
            error: taskEditError,
        },
    ] = useEditTaskMutation();
    useEffect(() => {
        if (isTaskEditError) {
            errorToast('Error editing task!', taskEditError as string);
        }
        if (isTaskEditedSuccessfully) {
            successToast('Task edited successfully!');
        }
    }, [isTaskEditedSuccessfully, isTaskEditError]);

    const [
        deleteTask,
        {
            isSuccess: isTaskDeletededSuccessfully,
            isError: isTaskDeleteError,
            error: taskDeleteError,
        },
    ] = useRemoveTaskMutation();
    useEffect(() => {
        if (isTaskDeleteError) {
            errorToast('Error deleting the task!', taskDeleteError as string);
        }
        if (isTaskDeletededSuccessfully) {
            successToast('Task deleted successfully!');
        }
    }, [isTaskDeletededSuccessfully, isTaskDeleteError]);


    const handleDelete = async () => {

        const task: Partial<Task> = {
            ID: id,
            Title: title,
            Description: description,
            Color: color,
            DueEnd: due_date + 'T' + due_end,
            DueDate:due_date + 'T' + due_end,
            DueStart: due_date + 'T' + due_start,
            Status: status,

        };


        await deleteTask(task as Task).unwrap();
            setShowModal(false);
         
    };
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task: Partial<Task> = {
            ID: id,
            Title: title,
            Description: description,
            Color: color,
            DueEnd: due_date + 'T' + due_end,
            DueDate:due_date + 'T' + due_end,
            DueStart: due_date + 'T' + due_start,
            Status: status,
        };

        await editTask(task as Task).unwrap();
        setShowModal(false);
     
    };


    return (
            <Modal isOpen={showModal} setIsOpen={setShowModal}>
                <ModalContent>
                    <h1 className="text-3xl font-semibold text-txt"> Edit Task </h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className="w-full">
                            <InputWithLabel
                                required
                                label="Task name"
                                type="text"
                                value={title}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }
                                    ) =>
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
                                        e: { target: { value: SetStateAction<string>; }; }
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
                                        e: { target: { value: SetStateAction<string>; }; }
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
                                        e: { target: { value: SetStateAction<string>; }; }
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
                            <InputWithLabel
                              label='Description'
                              value={description}
                              onChange={(e: { target: { value: any; }; }) => setDescription(e.target.value)}
                              multiline='true'
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
                            className="w-[25%] border-2 border-indigo-900 "
                            loading={isTaskEditing}
                            >
                                Save
                            </Button>
                            <Button 
                            type="button" 
                            select='danger' 
                            outline={true} 
                            onClick={handleDelete} 
                            className="w-[25%]">
                                Delete
                            </Button>

                        </div>
                    </form>
                </ModalContent>
            </Modal>
    )
};