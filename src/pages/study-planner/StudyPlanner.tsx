import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { RiRobot2Line } from 'react-icons/ri';

import Button from '../../components/Button';
import { useFetchTasksQuery } from '../../store';
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


    const { data: getTasks, error, isLoading } = useFetchTasksQuery(undefined);
    const tasks = getTasks?.data || [];

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (error) {
        content = <div>Error loading...</div>;
    } else {
        content = tasks.map(
            (tasks: {
                ID: any;
                Title: string | undefined;
                Status: string | undefined;
                Description: string | undefined;
                DueDate: string;
                StartDate: string;
                color: string | undefined;
            }) => {
                function formatTimestamp(timestamp: string): string {
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    });

                    return formattedDate;
                }
                const time = formatTimestamp(tasks.DueDate);
                return (
                    <div className="w-full">
                        <TaskBox
                            key={tasks.ID}
                            id={tasks.ID}
                            title={tasks.Title + ' | '}
                            status={tasks.Status}
                            description={tasks.Description}
                            DueDate={tasks.DueDate}
                            StartDate={tasks.StartDate}
                            due_date={'Due: ' + time}
                        />
                    </div>
                );
            },
        );
    }

    return (
        <div className="flex justify-between h-[100vh] xl:flex-row flex-col">
            <div className=" h-[100vh] basis-4/5 w-[100%%] flex justify-items-right justify-center">
                <Calendar className="w-[95%]" />
                {/* <div className="flex-row gap-3 justify-items-b justify-center w-full flex lg:hidden">
                    <Button
                        select="primary300"
                        type="button"
                        onClick={openModal}
                    >
                        + Add a task
                    </Button>

                    <Button
                        select="primary"
                        className="flex flex-row gap-2 lg-text-md"
                        type="button"
                    >
                        <RiRobot2Line size="16" color="white" /> Generate a plan
                    </Button>
                </div> */}
            </div>
            <div className=" basis-1/5 h-full flex-col border-l-2 border-slate-200 p-8 lg:flex hidden">
                <div className="flex-col flex gap-3 justify-items-center justify-center w-full">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IoMdSearch color="#312E81" />
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className=" w-full py-[3px] md:pl-8 py-5 text-sm text-txt focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2  rounded bg-[#F4F4F5] "
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
                        className="flex flex-row gap-2 lg-text-md"
                        type="button"
                    >
                        <RiRobot2Line size="16" color="white" /> Generate a plan
                    </Button>
                </div>
                <div className="flex flex-col mt-8 items-center justify-center w-full ">
                    <TasksContainer>{content}</TasksContainer>
                </div>
            </div>
            <AddTaskModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}
