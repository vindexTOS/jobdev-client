import React from 'react'
import Header from '../components/Header'
import Resume from '../components/Resume'
import { UseMainContext } from '../../context'
const Main = () => {
  const { data, nextUser, resumeIndex, save } = UseMainContext()
  const style = {
    mainDiv: `w-[80%] h-[100vh] justify-around  flex flex-col  m-auto bg-gray-100 p-5 shadow-2xl	 `,
    btnWrapper: `w-[100%] flex  items-center justify-around`,
    savebtn: `text-white w-[9rem] h-[3rem] bg-gradient-to-br from-green-400 to-green-500 hover:bg-gradient-to-bl focus:ring-2  focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm text-center shadow-lg `,
    nextbtn: `text-white w-[9rem] h-[3rem]  bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm shadow-lg  text-center`,
  }
  if (data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className={style.mainDiv}>
      <Header />
      <Resume data={data[resumeIndex]} />
      <div className={style.btnWrapper}>
        <button
          onClick={() => save(data[resumeIndex])}
          className={style.savebtn}
        >
          Save
        </button>
        <button className={style.nextbtn} onClick={nextUser}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Main
