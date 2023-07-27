import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth_components/Auth'
import { UseMainContext } from '../../context'
import userdefault from '../assets/photos/userdefault.jpg'
import Filter from './Filter'
import UserDropDown from './UserDropDown'
const Header = () => {
  const { DispatchAuth, StateAuth, userResumeData } = UseMainContext()
  const style = {
    mainDiv: ` relative bg-[#fd5564] h-[5rem] p-10    flex items-center justify-around  text-gray-100 rounded-[5px] shadow-md  `,
  }
  const showFitlerMenu = () => {
    setFilterDisplay(true)
  }
  const hideFilterMenu = () => {
    setFilterDisplay(false)
  }
  const [profileDrop, setProfileDrop] = useState(false)
  const [filterDisplay, setFilterDisplay] = useState(false)
  const navigation = useNavigate()
  return (
    <div className={style.mainDiv}>
      <div
        className="h-full flex items-center "
        onMouseEnter={showFitlerMenu}
        onMouseLeave={hideFilterMenu}
      >
        <button>Filter</button>
      </div>
      <button onClick={() => navigation('/')} className="text-4xl font-mono	">
        FindDev
      </button>
      {!StateAuth.userData.sub ? (
        <button
          onClick={() => DispatchAuth({ type: 'AUTH_POP_UP', payload: true })}
        >
          Register
        </button>
      ) : (
        <div
          className="bg-yellow-400 p-[2px] rounded-[50%] cursor-pointer relative"
          onClick={() => setProfileDrop(!profileDrop)}
        >
          <img
            className="w-[50px] h-[50px] rounded-[50%]"
            src={
              userResumeData &&
              userResumeData[0] &&
              userResumeData[0]?.picturePath
                ? userResumeData[0]?.picturePath
                : userdefault
            }
          />
          {profileDrop && (
            <UserDropDown
              id={
                userResumeData && userResumeData[0] && userResumeData[0].owner
              }
              img={
                userResumeData &&
                userResumeData[0] &&
                userResumeData[0]?.picturePath
                  ? userResumeData[0]?.picturePath
                  : userdefault
              }
            />
          )}
        </div>
      )}
      <Auth />
      {filterDisplay && (
        <Filter onMouseEnter={showFitlerMenu} onMouseLeave={hideFilterMenu} />
      )}
    </div>
  )
}

export default Header
