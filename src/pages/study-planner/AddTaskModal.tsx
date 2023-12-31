import { GoDash } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Modal } from '../../components/modal/modal.component';
import {
    changeTaskColor,
    changeTaskDescription,
    changeTaskDueDate,
    changeTaskDueEnd,
    changeTaskDueStart,
    changeTaskTitle,
} from '../../store';
import { RootState } from '../../store/index';
import { Task } from '../../types/event';
import { ModalContent } from './study-planner.styles';
import './Calendar.styles.css';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTaskModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
}) => {
    const dispatch = useDispatch();
    const { title, description, color, due_date, due_start, due_end } =
        useSelector((state: RootState) => state['task-form']);
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task: Partial<Task> = {
            title: title,
            description: description,
            color: color,
            due_date: due_date,
            due_start: due_start,
            due_end: due_end,
        };

        try {
            console.log(task);
            setShowModal(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-between h-[100vh]">
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ModalContent>
                    <h1 className="text-3xl font-semibold text-txt">Add Task</h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className="flex w-full justify-between pt-[6px] gap-6">
                            <div className="w-1/2">
                                <Input
                                    required
                                    label="Task name"
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        dispatch(changeTaskTitle(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="w-1/2">

                                <Input
                                    required
                                    label="Select color"
                                    id="color"
                                    className="rounded border  border-slate-400 p-2 w-full h-[49px] bg-white focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    type="color"
                                    value={color}
                                    onChange={(e) => {
                                        dispatch(
                                            changeTaskColor(e.target.value),
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between pt-[6px] gap-6">
                            <div className="w-1/2 flex flex-col justify-between">
                                <Input
                                    required
                                    value={due_date}
                                    type="date"
                                    label="Due date"
                                    onChange={(e) => {
                                        dispatch(
                                            changeTaskDueDate(e.target.value),
                                        );
                                    }}
                                />
                            </div>
                            <div className="flex flex-row justify-between pt-9 w-1/2">
                                <input
                                    type="time"
                                    className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 mr-1"
                                    value={due_start}
                                    onChange={(e) => {
                                        dispatch(
                                            changeTaskDueStart(e.target.value),
                                        );
                                    }}
                                />
                                <span className="text-xl pt-3">
                                    <GoDash />
                                </span>
                                <input
                                    type="time"
                                    className="rounded border ml-1 border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    value={due_end}
                                    onChange={(e) => {
                                        dispatch(
                                            changeTaskDueEnd(e.target.value),
                                        );
                                    }}
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
                                onChange={(e) => {
                                    dispatch(
                                        changeTaskDescription(e.target.value),
                                    );
                                }}
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
                                className='w-1/5 border-white'
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                select="primary"
                                className='w-2/5'
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
}
