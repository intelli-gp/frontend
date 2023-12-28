
import { useState } from "react";
import Button from "../../components/Button";
import { Calendar } from "./Calendar";
import { Modal } from "./modal/TasksModal";


export default function StudyPlanner() {

  const [showModal,setShowModal]=useState(false)
  const openModal =()=>{
    setShowModal(prev =>!prev)
  }
  return (<div className='flex justify-between h-[100vh]'>
    <div className=' basis-4/5 h-full flex-col justify-between  justify-items-stretch	'>
      <div className='h-[15vh]'>
        <h1 className='px-[5rem] py-8 text-5xl underline  font-semibold underline-offset-[1rem] text-indigo-900 '>Study Planner</h1>
      </div>
      <div className=" h-[85vh] w-[98%] flex justify-items-right justify-center">
        <Calendar className='w-[100%]' />
      </div>
    </div>
    <div className=' basis-1/5 h-full flex-col py-10 border-l-2 border-slate-200 px-6'>
      <div className='flex-col flex gap-3 justify-items-center justify-center w-full'>
        <Button
          select='primary300'
          type='button'
          onClick={openModal}
        >
          + Add a task
        </Button>

        <Button
          select='primary'
          type='button'
        >
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
          <p className="text-xs text-[#0369A1]">Math | <span className="text-xs text-[#0369A1] opacity-50">Assignment</span></p>
          </div>
        </div>
      </div>
      </div>
      
    </div>
    <Modal showModal={showModal} setShowModal={setShowModal} />

  </div>)

}