import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SaveDevDropDown from '../components/Saved_Dev_components/SaveDevDropDown'
import { UseMainContext } from '../../context'
const Main = () => {
  const { savedResumes, zoomIn } = UseMainContext()
  const style = {
    mainDiv: ` ${
      zoomIn
        ? 'w-[100vw] h-[100vh]'
        : 'h-[100%]  w-[80%] p-5     mt-2  rounded-[20px] '
    }    gap-2   justify-around   boxshadow m-auto flex flex-col   bg-gray-100   	 `,
  }
  // const formattedJsonString = JSON.stringify(savedResumes, null, 2)
  return (
    <div className={style.mainDiv}>
      {savedResumes.length > 0 && <SaveDevDropDown />}
      <Header />
      <Outlet />
    </div>
  )
}

export default Main
