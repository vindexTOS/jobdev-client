import React, { useState } from 'react'
import { UseMainContext } from '../../../context'

const ResumeProgressBar = () => {
  const { handleProgressBar, progressBar, setProgressBar } = UseMainContext()
  const style = {
    progressBarWrapper: `flex w-[100%] gap-2  items-center justify-center`,
  }

  const ProgressBar = ({ color, stage, handleNext }) => {
    return (
      <div className="w-[30%] relative  h-[2rem] flex items-center justify-between border-[1px] border-[#fd5564]  rounded-[2rem] ">
        <div
          className="w-[100%] 	"
          style={{
            backgroundColor: `${color}`,
            height: '20px',
          }}
        ></div>
        <div
          onClick={() => handleNext(stage)}
          className=" left-[95%] bg-white z-10  absolute bg-transparent	  w-[2.8rem] h-[2.5rem] rounded-[50%] border-[1px] border-pink-400 flex items-center justify-center "
        >
          {stage}
        </div>
      </div>
    )
  }
  const handleNext = (stage) => {
    setProgressBar(stage)
  }

  return (
    <div>
      <section className={style.progressBarWrapper}>
        <ProgressBar
          color={progressBar >= 1 ? 'black' : ''}
          stage={1}
          handleNext={handleNext}
        />
        <ProgressBar
          color={progressBar >= 2 ? 'black' : ''}
          stage={2}
          handleNext={handleNext}
        />
        <ProgressBar
          color={progressBar >= 3 ? 'black' : ''}
          stage={3}
          handleNext={handleNext}
        />
      </section>
      <button type="submit" onClick={() => handleProgressBar('back')}>
        Back
      </button>
      <button onClick={() => handleProgressBar('next')}>Next</button>
    </div>
  )
}

export default ResumeProgressBar
