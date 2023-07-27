import React, { useEffect } from 'react'
import { UseMainContext } from '../../context'
import Resume from '../components/Resume'
import axios from 'axios'
import { baseUrl } from '../globals/url'
const FindDev = () => {
  const {
    data,
    setData,

    save,
  } = UseMainContext()
  const style = {
    mainDiv: `h-[100%] gap-10  flex flex-col justify-around`,
    btnWrapper: `w-[100%] flex pt-2  items-center justify-around`,
    savebtn: `text-white w-[9rem] h-[3rem] bg-gradient-to-br from-green-400 to-green-500 hover:bg-gradient-to-bl focus:ring-2  focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm text-center shadow-lg `,
    nextbtn: `text-white w-[9rem] h-[3rem]  bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm shadow-lg  text-center`,
  }

  // function to trigger the useEffect above
  const nextUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/resume`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  if (data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className={style.mainDiv}>
      <Resume data={data} />
      <div className={style.btnWrapper}>
        <button onClick={() => save(data)} className={style.savebtn}>
          Save
        </button>
        <button className={style.nextbtn} onClick={nextUser}>
          Next
        </button>
      </div>
    </div>
  )
}

export default FindDev
