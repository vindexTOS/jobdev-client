import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const style = {
    mainDiv: `bg-[#fd5564] h-[5rem] p-10    flex items-center justify-around  text-gray-100 rounded-[5px] shadow-md  `,
  }
  const navigation = useNavigate()
  return (
    <div className={style.mainDiv}>
      <button>Filter</button>
      <button onClick={() => navigation('/')} className="text-4xl font-mono	">
        FindDev
      </button>

      <button onClick={() => navigation('upload')}>Upload</button>
    </div>
  )
}

export default Header
