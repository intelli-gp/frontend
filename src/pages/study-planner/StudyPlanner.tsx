import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { RiRobot2Line } from 'react-icons/ri';

import Button from '../../components/Button';
import { AddTaskModal } from './AddTaskModal';
import { Calendar } from './Calendar';
import './Calendar.styles.css';
import TaskBox from './TaskBox';
import { TasksContainer } from './study-planner.styles';

export default function StudyPlanner() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <div className="flex justify-between h-[100vh]">
            <div className=" h-[100vh] basis-4/5 w-[100%%] flex justify-items-right justify-center">
                <Calendar className="w-[95%]" />
            </div>
            <div className=" basis-1/5 h-full flex-col border-l-2 border-slate-200 p-8">
                <div className="flex-col flex gap-3 justify-items-center justify-center w-full">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IoMdSearch color="#312E81" />
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className=" w-full py-[3px] pl-8 text-sm text-txt focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2  rounded bg-[#F4F4F5] "
                            required
                        />
                    </div>
                    <Button
                        select="primary300"
                        type="button"
                        onClick={openModal}
                    >
                        + Add a task
                    </Button>

                    <Button
                        select="primary"
                        className="flex flex-row gap-2"
                        type="button"
                    >
                        <RiRobot2Line size="16" color="white" /> Generate a plan
                    </Button>
                </div>
                <div className="flex flex-col mt-8 items-center justify-center w-full ">
                    <TasksContainer>
                        <div className="flex items-left w-full pb-2">
                            <p className="text-xs ">Due Today:</p>
                        </div>
                        <TaskBox
                            courseName="Math |"
                            taskTitle="Assignment"
                            description="Submit problem set"
                            due_date="Due: March 21, 2:30"
                        />
                    </TasksContainer>
                </div>
            </div>
            <AddTaskModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}
