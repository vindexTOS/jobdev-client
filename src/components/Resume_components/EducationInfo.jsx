import React from 'react'
import Input from '../Input'
import { BiPlusCircle } from 'react-icons/bi'
import { UseMainContext } from '../../../context'
const EducationInfo = () => {
  const { addToEducation, education } = UseMainContext()
  const style = {
    topDiv: `flex flex-col justify-center w-[100%] h-[100%] gap-10`,
    mainDiv: `flex flex-col items-center justify-center gap-5 `,
    personal: `flex justify-around w-[100%]`,
    contact: `flex justify-around w-[100%]`,
    inputWrapper: `flex flex-col items-center w-[100%] justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,
    AddedEducation: `flex flex-col items-center justify-center bg-white p-10 rounded-[9px] shadow-md`,
    personalPostedDiv: `flex justify-around w-[100%] gap-10 py-2`,
    spanName: `text-gray-400 w-[rem] flex`,
    spanValue: `text-gray-600 flex`,
    p: `flex flex-col items-center jusify-center`,
  }

  const ExperienceBlogComponent = () => {
    return (
      <div className={style.mainDiv}>
        <div className={style.inputWrapper}>
          <h1 className={style.header}>Education</h1>
          <div className={style.personal}>
            <Input text="school" title="School" />
            <Input text="degree" title="Major-Degree" />
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
      <ExperienceBlogComponent />
      <button
        className="text-center flex justify-center items-center"
        onClick={() => addToEducation()}
      >
        <p className="text-gray-400">Add</p>
        <BiPlusCircle className="text-[#ef4a75] text-[4rem] hover:text-[#ef4a75] " />
      </button>
      {education.map((val, key) => {
        const { school, degree, desc, date } = val
        return (
          <div key={key} className={style.AddedEducation}>
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
