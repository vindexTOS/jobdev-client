import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth_components/Auth'
import { UseMainContext } from '../../context'
const Header = () => {
  const { authPopUp, setAuthPopUp, userData } = UseMainContext()
  const style = {
    mainDiv: ` relative bg-[#fd5564] h-[5rem] p-10    flex items-center justify-around  text-gray-100 rounded-[5px] shadow-md  `,
  }

  const navigation = useNavigate()
  return (
    <div className={style.mainDiv}>
      <button>Filter</button>
      <button onClick={() => navigation('/')} className="text-4xl font-mono	">
        FindDev
      </button>
      {!userData ? (
        <button onClick={() => setAuthPopUp(!authPopUp)}>Register</button>
      ) : (
        <button onClick={() => navigation('upload')}>Upload</button>
      )}
      <Auth />
    </div>
  )
}

export default Header
