import { useState } from 'react';

import Button from '../../components/Button';
import { Calendar } from './Calendar';
import { Modal } from '../../components/modal/Modal';
import { ModalContent } from './study-planner.styles';
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
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/index';
import Input from '../../components/Input';
import '../../index.css'
export default function StudyPlanner() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        title,
        description,
        color,
        due_date,
        due_start,
        due_end,

    } = useSelector((state: RootState) => state['task-form']);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <div className="flex justify-between h-[100vh]">
            <div className=" basis-4/5 h-full flex-col justify-between  justify-items-stretch	">
                <div className="h-[15vh]">
                    <h1 className="px-[5rem] py-8 text-5xl underline  font-semibold underline-offset-[1rem] text-indigo-900 ">
                        Study Planner
                    </h1>
                </div>
                <div className=" h-[85vh] w-[98%] flex justify-items-right justify-center">
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
                <div>
                    <div className="flex flex-col mt-8 items-center justify-center w-full ">
                        <div className="flex flex-col items-center justify-center w-full border border-[1px] h-[160px] rounded-md">
                            <div className="flex items-left w-[90%] pb-2">
                                <p className="text-xs ">Due Today:</p>
                            </div>
                            <div className="bg-[#DBEAF2] h-[100px] w-[90%] flex flex-row justify-left items-left rounded-md border-l-8 border-[#0369A1] p-2">
                                <p className="text-xs text-[#0369A1]">
                                    Math |{' '}
                                    <span className="text-xs text-[#0369A1] opacity-50">
                                        Assignment
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} >
                <ModalContent>
                    <h1 className="text-2xl text-txt">Add Task</h1>
                    <form>
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

