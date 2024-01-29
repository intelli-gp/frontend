import moment from 'moment';
import { useState } from 'react';
import {
    Calendar as BigCalendar,
    CalendarProps,
    Navigate,
    ToolbarProps,
    momentLocalizer,
} from 'react-big-calendar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import '../../index.css';
import { useFetchTasksQuery } from '../../store';
import './Calendar.styles.css';

const formats = {
    weekdayFormat: 'ddd',
    dayFormat: 'ddd',
};
const localizer = momentLocalizer(moment);

const CustomToolbar = (props: ToolbarProps) => {
    const [viewState, setViewState] = useState<string>('week');

    const goToDayView = () => {
        props.onView('day');
        setViewState('day');
    };
    const goToMonthView = () => {
        props.onView('month');
        setViewState('month');
    };

    const goToWeekView = () => {
        props.onView('week');
        setViewState('week');
    };

    const goToBack = () => {
        props.onNavigate(Navigate.PREVIOUS);
    };

    const goToNext = () => {
        props.onNavigate(Navigate.NEXT);
    };

    const viewFunctions = [goToWeekView, goToDayView, goToMonthView];
    const [currentViewIndex, setCurrentView] = useState(0);
    function cycleView() {
        setCurrentView((currentViewIndex + 1) % viewFunctions.length);
        const currentView = viewFunctions[currentViewIndex];
        currentView();
    }
    return (
        <div className="flex flex-column justify-between pt-[5rem]">
            <div className="flex flex-row gap-3 pb-4  w-2/5 px-2">
                {viewState == 'day' ? (
                    <>
                        <label className="text-4xl text-indigo-900 font-semibold">
                            {moment(props.date).format('DD ')}
                        </label>
                        <label className="text-4xl text-indigo-900 font-normal">
                            {moment(props.date).format('dddd')}
                        </label>
                    </>
                ) : (
                    <>
                        <label className="text-4xl text-indigo-900 font-semibold">
                            {moment(props.date).format('MMMM ')}
                        </label>
                        <label className="text-4xl text-indigo-900 font-light">
                            {moment(props.date).format('YYYY ')}
                        </label>
                    </>
                )}
            </div>

            <div className="flex flex-row justify-end items-center	justify-items-center w-1/5 ">
                <div className="flex flex-row justify-items-center ">
                    <button
                        onClick={goToBack}
                        className="w-1/4 bg-indigo-900 rounded-l-lg border-r-[1px] border-white flex p-[8px]  flex-row justify-center items-center"
                    >
                        <FaChevronLeft color="white" size="12" />
                    </button>
                    <button
                        onClick={cycleView}
                        className="w-[50%] bg-indigo-900 text-white  text-sm p-[5px] "
                    >
                        {viewState.charAt(0).toUpperCase() + viewState.slice(1)}
                    </button>
                    <button
                        onClick={goToNext}
                        className="w-1/4 p-[8px] bg-indigo-900 rounded-r-lg border-l-[1px] border-white flex flex-row items-center  justify-center"
                    >
                        <FaChevronRight color="white" size="12" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Calendar = (props: Omit<CalendarProps, 'localizer'>) => {
    const { data: getTasks, error, isLoading } = useFetchTasksQuery(undefined);
    const tasks = getTasks?.data || [];
    let EVENTS: any[] = [];
    function convertToTime(dateString: string): string {
        let date = new Date(dateString);
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();

        let period = 'AM';
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }
        let minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
        return `${hours}:${minutesStr} ${period}`;
    }
    if (isLoading) {
    } else if (error) {
    } else {
        EVENTS = tasks?.map(
            (task: {
                ID: any;
                Title: string | undefined;
                Status: string | undefined;
                Description: string | undefined;
                StartDate: string;
                DueDate: string;
            }) => ({
                start: moment(task.StartDate).toDate(),
                end: moment(task.DueDate).toDate(),
                data: {
                    task: {
                        id: task.ID,
                        status: task.Status,
                        courseName: task.Title,
                        start: convertToTime(task.StartDate),
                        end: convertToTime(task.DueDate),
                    },
                },
            }),
        );
    }
    return (
        <BigCalendar
            popup
            {...props}
            events={EVENTS}
            formats={formats}
            localizer={localizer}
            defaultView={'week'}
            max={moment('2023-12-24T23:59:00').toDate()}
            min={moment('2023-12-24T08:00:00').toDate()}
            components={{
                toolbar: CustomToolbar,
                event: ({ event }: { event: any }) => {
                    const data = event?.data;
                    if (data?.task)
                        return (
                            <div className='bg-[#DBEAF2] border-l-[6px]	border-[#0369A1] p-2 rounded-[6px] h-full w-[96%]'>
                                <div className="flex flex-col justify-between items-left ">
                                    <p className="text-[10px] text-[#0369A1] pb-[4px] font-bold">
                                        <span>{data.task.start + ' - '}</span>
                                        <span>{data.task.end}</span>
                                    </p>
                                    <p className="text-xs text-[#0369A1] font-bold">
                                    {data.task.courseName}
                                    </p>
                                </div>
                            </div>
                        );

                    return null;
                },
            }}
        />
    );
};
