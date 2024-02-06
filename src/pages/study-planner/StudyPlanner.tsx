import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { RiRobot2Line } from 'react-icons/ri';
import { GoPlus } from "react-icons/go";
import noTask from '../../assets/imgs/no-task.png'

import Button from '../../components/Button';
import { useFetchTasksQuery } from '../../store';
import { AddTaskModal } from '../../components/AddTaskModal';
import { Calendar } from './Calendar';
import './Calendar.styles.css';
import TaskBox from '../../components/TaskBox';
import { TasksContainer } from './study-planner.styles';
import { EditTaskModal } from '../../components/EditTaskModal';
import Skeleton from '../../components/Skeleton';
import React from 'react';

export default function StudyPlanner() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };

    const { data: getTasks, error, isLoading } = useFetchTasksQuery(undefined);
    const data = getTasks?.data || [];
    const [id, setID] = useState(0);
    const [editShow, setEdit] = useState(false);
    const [tasks, setTasks] = useState(data);

    const [searchValue, setSearchValue] = useState('');
    const [showButtons, setShowButtons] = useState(true);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchValue(value);
        setShowButtons(value === '');

        const filteredTasks = data.filter((task: { Title: string; }) =>
            task.Title.toLowerCase().includes(value.toLowerCase())
        );

        setTasks(filteredTasks);

    };

    const handleEdit = (ID: number) => {
        setID(ID);
        setEdit((prev) => !prev);
    }
    useEffect(() => {
        setTasks(data)
    }, [data]);
    const [content, setContent] = useState();

    useEffect(() => {
        let content;
        if (isLoading) {
            content = (
                <div className="h-auto w-full">
                    <Skeleton times={3} className="h-20 w-full" />
                </div>
            );
        } else if (error) {
            content = (
                <div className="h-full w-full flex justify-center items-center p-8 flex-col gap-4">
                    <img src={noTask} className="w-1/2" />
                    <p className="text-slate-500">Error Loading..</p>
                </div>
            );
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
                        <div className="w-full" onClick={() => handleEdit(tasks.ID)}>
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

        setContent(content);
    }, [isLoading, error, tasks]);

    return (
        <div className="flex justify-between h-[100vh] xl:flex-row flex-col">
            <div className=" h-[100vh] lg:basis-4/5 w-[100%%] flex justify-items-right justify-center">
                <Calendar className="w-[95%] h-full" />
                <div className="flex-col gap-3 absolute justify-center  w-[3.8rem] bottom-0 right-0 m-6 flex lg:hidden">
                    <Button
                        select="primary300" S
                        type="button"
                        className="!p-4 rounded-full justify-center"
                        onClick={(e: unknown) => {
                            (e as MouseEvent).stopPropagation();
                            openModal();
                        }}
                    >
                        <GoPlus size="28" color="#0D062D" />
                    </Button>
                    <Button
                        select="primary"
                        type="button"
                        className="!p-4 rounded-full items-center justify-center"
                    >
                        <RiRobot2Line size="24" color="white" />
                    </Button>
                </div>
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
                            value={searchValue}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {showButtons && (
                        <>
                            <Button select="primary300" type="button" onClick={openModal}>
                                + Add a task
                            </Button>

                            <Button
                                select="primary"
                                className="flex flex-row gap-2 py-[10px]"
                                type="button"
                            >
                                <RiRobot2Line size="16" color="white" />
                                <span className="text-sm">Make plan</span>
                            </Button>
                        </>
                    )}
                </div>
                <div className="flex flex-col mt-8 items-center justify-center w-full ">
                    <TasksContainer>  {React.Children.count(content) !== 0 ? (
                        content
                    ) : (
                        <div className="h-full w-full flex justify-center items-center p-8 flex-col gap-4">
                            <img src={noTask} className="w-[90%]" />
                            <div className='flex flex-col w-full justify-center items-center mr-6'>
                            <p className="text-txt text-lg font-extrabold">No tasks</p>
                            <p className="text-slate-400 text-sm text-center">You have no tasks to do.</p>
                            </div>
                           

                        </div>
                    )}</TasksContainer>
                </div>
            </div>
            {editShow && <EditTaskModal showModal={editShow} setShowModal={setEdit} ID={id} />}
            <AddTaskModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}
