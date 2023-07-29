import React from 'react'
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
        <h1 className={style.header}>Education</h1>
        <div className={style.personal}>
          <Input dispatchType="SCHOOL" stateType="school" title="School" />
          <Input
            dispatchType="DEGREE"
            stateType="degree"
            title="Major-Degree"
          />
          <Input
            dispatchType="EDUCATION_DATE"
            stateType="educationDate"
            title="Date"
          />
        </div>
        <div className={style.personal}>
          <Textarea
            dispatchType="EDUCATION_DESC"
            stateType="educationDesc"
            title="Description"
          />
        </div>
      </div>
    </div>
  )
}
const EducationInfo = () => {
  const { DispatchResume, StateResume } = UseMainContext()

  const addToEducation = () => {
    let obj = {
      school: StateResume.school,
      degree: StateResume.degree,
      date: StateResume.educationDate,
      desc: StateResume.educationDesc,
    }
    if (obj.school && obj.degree && obj.date && obj.desc) {
      DispatchResume({ type: 'EDUCATION_ARRAY', payload: obj })
      DispatchResume({ type: 'CLEAN_EDUCATION_OBJECT' })
    }
  }
  const RemoveEducation = (index) => {
    let newArr = StateResume.education.filter((val, i) => i !== index)
    DispatchResume({ type: 'EDUCATION_ARRAY_REMOVE', payload: newArr })
  }
  const style = {
    topDiv: `flex flex-col justify-center w-[100%] h-[100%] gap-10`,
    mainDiv: `flex flex-col items-center justify-center gap-5 `,
    deleteIcon: `text-red-500  hover:opacity-90 opacity-30 text-[2rem] cursor-pointer absolute right-2 top-2 transition-opacity duration-500 ease-in-out`,

    personal: `flex justify-around w-[100%]`,
    contact: `flex justify-around w-[100%]`,
    inputWrapper: `flex flex-col items-center w-[100%] justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,
    AddedEducation: `relative flex flex-col items-center justify-center bg-white p-10 rounded-[9px] shadow-md`,
    personalPostedDiv: `flex justify-around w-[100%] gap-10 py-2`,
    spanName: `text-gray-400 w-[rem] flex`,
    spanValue: `text-gray-600 flex`,
    p: `flex flex-col items-center jusify-center`,
  }

  return (
    <div className={style.topDiv}>
      <ExperienceBlogComponent />
      <button
        className="text-center flex justify-center items-center"
        onClick={() => addToEducation()}
      >
        <p className="text-gray-400">Add</p>
        <BiPlusCircle className="text-[#ef4a75] text-[4rem] hover:text-[#ef4a75] " />
      </button>
      {StateResume.education.map((val, key) => {
        const { school, degree, desc, date } = val
        return (
          <div key={key} className={style.AddedEducation}>
            <ImCancelCircle
              className={style.deleteIcon}
              onClick={() => RemoveEducation(key)}
            />
            <div className={style.personalPostedDiv}>
              <p className={style.p}>
                <span className={style.spanName}>School </span>
                <span className={style.spanValue}>{school}</span>
              </p>
              <p className={style.p}>
                <span className={style.spanName}>Degree </span>
                <span className={style.spanValue}>{degree}</span>
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

export default EducationInfo
