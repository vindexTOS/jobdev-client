import React, { useState, useEffect } from 'react'
import BasicInfo from '../components/Resume_components/BasicInfo'
import { UseMainContext } from '../../context'
import ResumeProgressBar from '../components/Resume_components/ResumeProgressBar'
import WorkInfo from '../components/Resume_components/WorkInfo'
import EducationInfo from '../components/Resume_components/EducationInfo'
import Finished from '../components/Resume_components/Finished'
import Error from '../components/Error'
const register = () => {
  const { progressBar, StateResume } = UseMainContext()
  const style = {
    mainDiv: ` ${
      StateResume.education.length > 1 ? 'h-[100%] ' : 'h-[100vh]'
    }  flex flex-col   bg-gray-100  justify-around mt-20 max_xl:justify-center max_xl:items-center  max_xl:mt-40 max_xl:h-[100%] max_xl:gap-20  max_lg:gap-60 max_lg:m-0 max_lg:pb-80 `,
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className={style.mainDiv}>
      {progressBar === 0 ? (
        <BasicInfo />
      ) : progressBar === 1 ? (
        <WorkInfo />
      ) : progressBar === 2 ? (
        <EducationInfo />
      ) : (
        <Finished />
      )}
      <Error error={StateResume.postError} />
      <ResumeProgressBar />
    </form>
  )
}

export default register
