import React, { useState } from 'react'
import Input from '../Input'
import { BiPlusCircle } from 'react-icons/bi'
import { UseMainContext } from '../../../context'
const WorkInfo = () => {
  const {
    addToWorkExperience,
    workExperienceBlockCount,
    AddMoreWork,
  } = UseMainContext()
  const style = {
    topDiv: `flex flex-col justify-center w-[100%] h-[100%] gap-10`,
    mainDiv: `flex flex-col items-center justify-center gap-5 `,
    personal: `flex justify-around w-[100%]`,
    contact: `flex justify-around w-[100%]`,
    inputWrapper: `flex flex-col items-center w-[100%] justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,
  }

  const ExperienceBlogComponent = () => {
    return (
      <div className={style.mainDiv}>
        <div className={style.inputWrapper}>
          <h1 className={style.header}>Job Experience</h1>
          <div className={style.personal}>
            <Input text="company" title="Company" />
            <Input text="position" title="Position" />
          </div>
          <div className={style.personal}>
            <Input text="date" title="Date" />
            <Input text="desc" title="Description" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={style.topDiv}>
      {new Array(workExperienceBlockCount)
        .fill(ExperienceBlogComponent)
        .map((Component, index) => (
          <Component key={index} />
        ))}

      <button
        className="text-center flex justify-center items-center"
        onClick={() => {
          AddMoreWork(), addToWorkExperience()
        }}
      >
        <p className="text-gray-400">Add More Experience</p>
        <BiPlusCircle className="text-[#ef4a75] text-[4rem] hover:text-[#ef4a75] " />
      </button>
    </div>
  )
}

export default WorkInfo
