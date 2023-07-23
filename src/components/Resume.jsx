import React from 'react'
import { useState } from 'react'
import InformationBlock from './InformationBlock'
const Resume = ({ data }) => {
  const style = {
    mainDiv: `border-solid-2  border-black flex flex-col gap-10`,
    infoWrapper: ` bg-gray-200 p-5 rounded-[5px] shadow-md solid border-black   `,
    header: `text-3xl font-medium font-mono text-gray-500`,
    info: `text-gray-600`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.infoWrapper}>
        <h1 className={style.header}> Personal Information </h1>
        <InformationBlock title="Job" data={data.jobTitle} />
        <InformationBlock title="First Name" data={data.firstName} />
        <InformationBlock title="Last Name" data={data.lastName} />
        <InformationBlock title="Age" data={data.age} />
        <InformationBlock title="Email" data={data.email} />
        <InformationBlock title="Address" data={data.address} />
      </div>
      {data.jobExperience.map((elem) => {
        return (
          <div key={elem.compay} className={style.infoWrapper}>
            <h1 className={style.header}>Experince</h1>
            <InformationBlock title="Company" data={elem.compay} />
            <InformationBlock title="Position" data={elem.position} />
            <InformationBlock title="Description" data={elem.desc} />
            <InformationBlock title="Date" data={elem.workingDate} />
          </div>
        )
      })}
      {data.education?.map((elem) => {
        return (
          <div key={elem.school} className={style.infoWrapper}>
            <h1 className={style.header}>Education</h1>
            <InformationBlock title="School" data={elem.school} />
            <InformationBlock title="Degree" data={elem.degrre} />
            <InformationBlock title="Description" data={elem.desc} />
            <InformationBlock title="Date" data={elem.eduDate} />
          </div>
        )
      })}
    </div>
  )
}

export default Resume
