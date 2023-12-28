import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
    Navigate, ToolbarProps
  } from "react-big-calendar";
  import moment from "moment";
  import "./Calendar.styles.css";
  import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
  import { EVENTS } from "./Calendar.Constants";

  const formats={
    weekdayFormat:'ddd',
    dayFormat:'ddd'

  }
  const localizer = momentLocalizer(moment);
    
  const CustomToolbar = (props: ToolbarProps) => {
    // const [viewState, setViewState] = useState<string>('month');
  
    // const goToDayView = () => {
    //   props.onView('day');
    //   setViewState('day');
    // };
    // const goToMonthView = () => {
    //   props.onView('month');
    //   setViewState('month');
    // };
  
    // const goToWeekView = () => {
    //   props.onView('week');
    //   setViewState('week');
    // };
  
    const goToBack = () => {
      props.onNavigate(Navigate.PREVIOUS);
    };
  
    const goToNext = () => {
      props.onNavigate(Navigate.NEXT);
    };
  
    const goToToday = () => {
      props.onNavigate(Navigate.TODAY);
    };
  

    // const viewFunctions = [goToWeekView, goToDayView, goToMonthView];
    // const  [currentViewIndex,setCurrentView] = useState(0)
    // function cycleView() {
    //   const currentView = viewFunctions[currentViewIndex];
    //   currentView();
    //   setCurrentView( (currentViewIndex + 1) % viewFunctions.length);

    // }
    return (
      <div className='flex flex-column justify-between'>
        <div className='flex flex-row gap-3 py-5 pl-[9%] items-center'>
        <label className='text-3xl text-indigo-900 font-semibold'>{moment(props.date).format('MMMM ')}</label>
        <label className='text-3xl text-indigo-900 font-light'>{moment(props.date).format('YYYY ')}</label>
        </div>
        <div className="flex flex-row justify-end items-center	justify-items-center w-1/5 pt-[2px]">
          <div className='   w-1/2 flex flex-row  justify-items-center '>
          <button onClick={goToBack} className='w-1/4 bg-indigo-900 rounded-l-lg border-r-[1px] border-white flex p-[5px]  flex-row justify-center items-center'><FaChevronLeft color='white' size='12'/></button>
          <button onClick={goToToday}className='w-[50%] bg-indigo-900 text-white font-light text-xs p-[5px] '> Today</button>
          <button onClick={goToNext} className='w-1/4 p-[5px] bg-indigo-900 rounded-r-lg border-l-[1px] border-white flex flex-row items-center  justify-center'><FaChevronRight color='white' size='12'/></button>
          </div>
          {/* <button onClick={cycleView} className="pr-2"></button> */}
        </div>
      </div>
    );
  };
  
  
  export const Calendar = (props: Omit<CalendarProps, "localizer">) => {

    // const appointments = EVENTS?.map((appointment: { start: Date; end: Date; }) => ({
    //   start: new Date(appointment.start),
    //   end: new Date(appointment.end),
    //   data: { appointment },
    // }));
    return (
      <BigCalendar
        popup
        {...props}
        events={EVENTS}
        formats={formats}
        localizer={localizer}
        defaultView={"week"}
        max={moment("2023-12-24T16:00:00").toDate()}
        min={moment("2023-12-24T08:00:00").toDate()}
        components={{
            toolbar: CustomToolbar,
            event: ({ event }: { event: any }) => {
              const data = event?.data;
              if (data?.appointment)
                return (
                  <div className='p-[4px] bg-[#DBEAF2] gap-1 flex flex-col justify-left items-left rounded-md border-l-8 border-[#0369A1] w-[98%] h-[100%] '>
                   <p className="text-xs text-[#0369A1]">{data.appointment.start} - {data.appointment.end}</p>
                   <p className="text-xs text-[#0369A1]">{data.appointment.courseName}</p>
                  </div>
                );
        
              return null;
            },
            
          }}
       

      />
    );
  };