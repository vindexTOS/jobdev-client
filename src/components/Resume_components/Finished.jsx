import React from 'react'
import { UseMainContext } from '../../../context'

const Finished = () => {
  const { PostResume } = UseMainContext()
  const style = {
    topDiv: `flex flex-col justify-center w-[100%] h-[100%] gap-10`,
  }
  return (
    <div className={style.topDiv}>
      <button onClick={() => PostResume()}>FINNISHED</button>
    </div>
  )
}

export default Finished
