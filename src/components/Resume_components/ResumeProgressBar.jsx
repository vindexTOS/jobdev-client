import React, { useState, useEffect } from 'react'
import { UseMainContext } from '../../../context'
import Button from '../Button'
const ProgressBar = ({ color, stage, progress, handleNext }) => {
  return (
    <div className="w-[30%]  max_smm:hidden max_smm:w-[10%]  max_smm:mt-20 relative h-[2rem] flex items-center justify-between border-[1px] border-[#fd5564] rounded-[2rem]">
      <div
        className="w-[100%] transition-all duration-1000 rounded-[12px] h-[1.9rem] "
        style={{
          backgroundColor: `${color}`,

          width: `${progress}%`,
        }}
      ></div>
      <div
        style={{
          backgroundColor: `${color}`,
          color: !color ? 'gray' : 'white',
        }}
        className="left-[95%] bg-white z-10 absolute bg-transparent w-[2.8rem] h-[2.5rem] rounded-[50%] border-[1px] border-pink-400 flex items-center justify-center"
      >
        {stage}
      </div>
    </div>
  )
}

const ResumeProgressBar = () => {
  const {
    StateResume,
    DispatchResume,
    progressBar,
    setProgressBar,
  } = UseMainContext()

  // resume progress bar  UI element

  const handleProgressBar = (string) => {
    let BaisicInfoCheck =
      StateResume.firstName &&
      StateResume.lastName &&
      StateResume.jobTitle &&
      StateResume.age &&
      StateResume.email
        ? true
        : false

    if (string === 'next' && progressBar <= 3) {
      if (!BaisicInfoCheck) {
        setProgressBar((prevProgressBar) => prevProgressBar + 1)
      } else {
        DispatchResume({
          type: 'POST_ERROR',
          payload: 'Fill out all the fields',
        })

        setProgressBar((prevProgressBar) => (prevProgressBar = 0))
        setTimeout(() => {
          DispatchResume({ type: 'POST_ERROR', payload: '' })
        }, 3000)
      }
    } else if (string === 'back' && progressBar >= 1) {
      setProgressBar((prevProgressBar) => prevProgressBar - 1)
    }
  }

  const [progressWidth, setProgressWidth] = useState(0)

  const style = {
    btnWrapper: `flex w-[100%] items-center justify-around  `,
  }
  const handleNext = (stage) => {
    setProgressBar(stage)
  }

  // Update progressWidth whenever progressBar changes
  useEffect(() => {
    setProgressWidth(progressBar * 100)

    // console.log(progressWidth)
    // console.log(progressBar)
  }, [progressBar])

  return (
    <div className="flex flex-col gap-10 py-10 py-20 max_xl:w-[100%]   max_smm:mt-[8rem] ">
      <section className="flex w-[100%] gap-2 items-center justify-center">
        <ProgressBar
          color={progressBar >= 1 ? '#fe3c72' : ''}
          stage={1}
          progress={progressWidth}
          handleNext={handleNext}
        />
        <ProgressBar
          color={progressBar >= 2 ? '#fe3c72' : ''}
          stage={2}
          progress={progressWidth}
          handleNext={handleNext}
        />
        <ProgressBar
          color={progressBar >= 3 ? '#fe3c72' : ''}
          stage={3}
          progress={progressWidth}
          handleNext={handleNext}
        />
      </section>
      <section className={style.btnWrapper}>
        <Button func={handleProgressBar}>Back</Button>
        <Button func={handleProgressBar}>Next</Button>
      </section>
    </div>
  )
}

export default ResumeProgressBar
