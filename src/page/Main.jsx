import React, { useEffect } from 'react'

import { UseMainContext } from '../../context'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
const Main = () => {
  const style = {
    mainDiv: `w-[80%] h-[100%] justify-around  flex flex-col  m-auto bg-gray-100 p-5 shadow-2xl	 `,
  }

  return (
    <div className={style.mainDiv}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Main
