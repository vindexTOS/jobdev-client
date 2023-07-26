import React, { useState, useEffect } from 'react'
import BasicInfo from '../components/Resume_components/BasicInfo'
import { UseMainContext } from '../../context'
import ResumeProgressBar from '../components/Resume_components/ResumeProgressBar'
import WorkInfo from '../components/Resume_components/WorkInfo'
import EducationInfo from '../components/Resume_components/EducationInfo'
import Finished from '../components/Resume_components/Finished'
import Error from '../components/Error'
const register = () => {
  const { getValues, progressBar, education, StateResume } = UseMainContext()
  const style = {
    mainDiv: ` ${
      StateResume.education.length > 1 ? 'h-[100%] ' : 'h-[100vh]'
    }  flex flex-col justify-around mt-20`,
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
