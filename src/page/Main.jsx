import React, { useEffect } from 'react'

import { UseMainContext } from '../../context'
import { Outlet } from 'react-router-dom'
import Disk from '../assets/photos/floppy-disk.png'
import Header from '../components/Header'
const Main = () => {
  const { savedResumes } = UseMainContext()
  const style = {
    mainDiv: `w-[80%] h-[100%] gap-20 py-10 pb-20 justify-around   m-auto flex flex-col   bg-gray-100 p-5 shadow-2xl	 `,
    img: ` floating-img    w-[50px] fixed  cursor-pointer   left-10 top-9 transform   rounded-[9px] flex items-center justify-center text-[1.2rem] animate-slide-in   z-50`,
  }

  return (
    <div className={style.mainDiv}>
      <div>
        <img className={style.img} src={Disk} />
      </div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Main
