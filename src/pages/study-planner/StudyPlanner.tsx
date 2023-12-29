import { useState } from 'react';

import Button from '../../components/Button';
import { Calendar } from './Calendar';
import { Modal } from '../../components/modal/Modal';
import { ModalContent, TasksContainer } from './study-planner.styles';
import { useDispatch, useSelector } from 'react-redux';
import { GoDash } from "react-icons/go";
import {
    changeTaskTitle,
    changeTaskDescription,
    changeTaskColor,
    changeTaskDueDate,
    changeTaskDueStart,
    changeTaskDueEnd,
} from '../../store';
import { RootState } from '../../store/index';
import Input from '../../components/Input';
import '../../index.css'
import TaskBox from './TaskBox';
import { Task } from '../../types/event';
export default function StudyPlanner() {
    const dispatch = useDispatch();
    const {
        title,
        description,
        color,
        due_date,
        due_start,
        due_end,

    } = useSelector((state: RootState) => state['task-form']);
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task: Partial<Task> = {
            title: title,
            description: description,
            color: color,
            due_date:due_date,
            due_start: due_start,
            due_end: due_end,
        };

        try {
            console.log(task)
            setShowModal(false)
        } catch (err) {
            console.log(err);
        }
    };
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <div className="flex justify-between h-[100vh]">
            <div className=" basis-4/5 h-full flex-col justify-between  justify-items-stretch	">
                <div className="h-[15vh]">
                    <h1 className="px-[5rem] py-8 lg:text-5xl text-4xl underline  font-semibold underline-offset-[1rem] text-indigo-900 ">
                        Study Planner
                    </h1>
                </div>
                <div className=" h-[85vh] w-[100%] flex justify-items-right justify-center">
                    <Calendar className="w-[100%]" />
                </div>
            </div>
            <div className=" basis-1/5 h-full flex-col py-10 border-l-2 border-slate-200 px-6">
                <div className="flex-col flex gap-3 justify-items-center justify-center w-full">
                    <Button
                        select="primary300"
                        type="button"
                        onClick={openModal}
                    >
                        + Add a task
                    </Button>

                    <Button select="primary" type="button">
                        Generate a plan
                    </Button>
                </div>
                    <div className="flex flex-col mt-8 items-center justify-center w-full ">
                   <TasksContainer>
                  <div className="flex items-left w-full pb-2">
                  <p className="text-xs ">Due Today:</p>
                  </div>
                  <TaskBox courseName='Math |' taskTitle='Assignment'/>
                  </TasksContainer>
                  </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} >
                <ModalContent>
                    <h1 className="text-2xl text-txt">Add Task</h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className="flex w-full justify-between pt-[6px]">
                            <Input
                                required
                                label="Task name"
                                className="rounded border  border-slate-400 p-2  focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    dispatch(changeTaskTitle(e.target.value));
                                }}
                            />
                            <div className='w-1/2 flex flex-col justify-between'>
                            <label htmlFor='color' className="font-bold">
                                Select color:
                            </label>
                            <input
                                required
                                id="color" 
                                type='color'
                                className="rounded border  border-slate-400 p-2 w-full h-[49px] bg-white focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                value={color}
                                onChange={(e) => {
                                    dispatch(changeTaskColor(e.target.value));
                                }}
                            />
                            </div>
                        </div>
                        <div className="flex w-full justify-between pt-[6px]">
                        <div className='w-1/2 flex flex-col justify-between'>
                            <label htmlFor='date' className="font-bold">
                            Due date:
                            </label>
                            <input
                                required
                                className="rounded border border-slate-400 p-2 w-[80%] focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                type ='date'
                                value={due_date}
                                onChange={(e) => {
                                    dispatch(changeTaskDueDate(e.target.value));
                                }}
                            />
                            </div>
                            <div className='flex flex-row justify-between pt-9 gap-3 w-1/2'>
                                <input
                                    type="time"
                                    className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    value={due_start}
                                    onChange={(e) => {
                                        dispatch(changeTaskDueStart(e.target.value));
                                    }}
                                />
                                <span className='text-xl pt-3'><GoDash/></span>
                                <input
                                    type="time"
                                    className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    value={due_end}
                                    onChange={(e) => {
                                        dispatch(changeTaskDueEnd(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-[6px]">
                        <label htmlFor='description' className="font-bold">
                                Description:
                        </label>
                        <textarea
                                required
                                className="rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2"
                                value={description}
                                onChange={(e) => {
                                    dispatch(changeTaskDescription(e.target.value));
                                }}
                                placeholder='Enter description...' 
                                maxLength={1000}
                                cols={33}
                                rows={4}
                            />
                        </div>
                        <div className="w-full flex flex-row gap-4 justify-end items-end pt-3">
                        <Button type="submit" select="primary">
                            Create
                        </Button>
                        <Button
                            type="button"
                            outline={true}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                    </form>
                    
                </ModalContent>
            </Modal>
        </div>
    );
}

