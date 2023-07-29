import React, { useState } from 'react'
import Input from '../Input'
import { BiPlusCircle } from 'react-icons/bi'
import { UseMainContext } from '../../../context'
import { ImCancelCircle } from 'react-icons/im'
import Textarea from '../Textarea'
const ExperienceBlogComponent = () => {
  const style = {
    mainDiv: `flex flex-col items-center justify-center gap-5 `,
    personal: `flex justify-around w-[100%]`,
    inputWrapper: `flex flex-col items-center w-[100%] justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.inputWrapper}>
        <h1 className={style.header}>Job Experience</h1>
        <div className={style.personal}>
          <Input dispatchType="COMPANY" stateType="company" title="Company" />
          <Input
            dispatchType="POSITION"
            stateType="position"
            title="Position"
          />
          <Input dispatchType="WORK_DATE" stateType="workDate" title="Date" />
        </div>
        <div className={style.personal}>
          <Textarea
            dispatchType="WORK_DEC"
            stateType="workDesc"
            title="Description"
          />
        </div>
      </div>
    </div>
  )
}
const WorkInfo = () => {
  const { StateResume, DispatchResume } = UseMainContext()

  const addToWorkExperience = () => {
    let obj = {
      company: StateResume.company,
      position: StateResume.position,
      date: StateResume.workDate,
      desc: StateResume.workDesc,
    }

    if (obj.company && obj.position && obj.date && obj.desc) {
      DispatchResume({ type: 'WORK_ARRAY', payload: obj })
      DispatchResume({ type: 'CLEAR_WORK_OBJECT' })
    }
  }

  const RemoveWork = (index) => {
    let newArr = StateResume.workExperience.filter((val, i) => i !== index)
    DispatchResume({ type: 'WORK_ARRAY_REMOVE', payload: newArr })
  }
  const style = {
    topDiv: `flex flex-col justify-center w-[100%] h-[100%] gap-10`,
    mainDiv: `flex flex-col items-center justify-center gap-5 `,
    deleteIcon: `text-red-500  hover:opacity-90 opacity-30 text-[2rem] cursor-pointer absolute right-2 top-2 transition-opacity duration-500 ease-in-out`,
    personal: `flex justify-around w-[100%]`,
    contact: `flex justify-around w-[100%]`,
    inputWrapper: `flex flex-col items-center w-[100%] justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,
    AddedEducation: ` relative flex flex-col items-center justify-center bg-white p-10 rounded-[9px] shadow-md`,

    personalPostedDiv: `flex justify-around w-[100%] gap-10 py-2`,
    spanName: `text-gray-400 w-[rem] flex`,
    spanValue: `text-gray-600 flex`,
    p: `flex  `,
  }

  return (
    <div className={style.topDiv}>
      <ExperienceBlogComponent />
      <button
        className="text-center flex justify-center items-center"
        onClick={() => addToWorkExperience()}
      >
        <p className="text-gray-400">Add</p>
        <BiPlusCircle className="text-[#ef4a75] text-[4rem] hover:text-[#ef4a75] " />
      </button>
      {StateResume.workExperience.map((val, key) => {
        const { company, position, desc, date } = val
        return (
          <div key={key} className={style.AddedEducation}>
            <ImCancelCircle
              className={style.deleteIcon}
              onClick={() => RemoveWork(key)}
            />
            <div className={style.personalPostedDiv}>
              <p className={style.p}>
                <span className={style.spanName}>Company </span>
                <span className={style.spanValue}>{company}</span>
              </p>
              <p className={style.p}>
                <span className={style.spanName}>Position </span>
                <span className={style.spanValue}>{position}</span>
              </p>
            </div>
            <div className={style.personalPostedDiv}>
              <p className={style.p}>
                <span className={style.spanName}>Description </span>
                <span className={style.spanValue}>{desc}</span>
              </p>
              <p className={style.p}>
                <span className={style.spanName}>Date </span>
                <span className={style.spanValue}>{date}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WorkInfo
