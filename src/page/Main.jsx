import React, { useEffect } from 'react'

import { UseMainContext } from '../../context'
import { Outlet } from 'react-router-dom'
import Disk from '../assets/photos/floppy-disk.png'
import Header from '../components/Header'
import SaveDevDropDown from '../components/Saved_Dev_components/SaveDevDropDOwn'
const Main = () => {
  const { savedResumes } = UseMainContext()
  const style = {
    mainDiv: `w-[80%] h-[100%] gap-20 py-10 pb-20 justify-around   m-auto flex flex-col   bg-gray-100 p-5 shadow-2xl	 `,
  }

  return (
    <div className={style.mainDiv}>
      <SaveDevDropDown />
      <Header />
      <Outlet />
    </div>
  )
}

export default Main
