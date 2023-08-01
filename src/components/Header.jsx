import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth_components/Auth'
import { UseMainContext } from '../../context'
import userdefault from '../assets/photos/userdefault.jpg'
import Filter from './Filter'
import UserDropDown from './UserDropDown'
import { BsSearchHeart, BsFillPersonFill } from 'react-icons/bs'
import { MdFilterList, MdZoomOutMap, MdZoomInMap } from 'react-icons/md'
import { AiOutlineLogin } from 'react-icons/ai'
import { motion as m } from 'framer-motion'

const Header = () => {
  const {
    DispatchAuth,
    StateAuth,
    userResumeData,
    zoomIn,
    setZoomIn,
    responsiveHeader,
  } = UseMainContext()

  const [profileDrop, setProfileDrop] = useState(false)
  const [filterDisplay, setFilterDisplay] = useState(false)
  const style = {
    mainDiv: `${
      zoomIn
        ? `translate-y-[-85px]  top-0  sticky  absolute transition-all duration-300`
        : 'rounded-[50px]  relative  '
    }    headerColor h-[6rem] p-10 z-50 w-[100%] relative  max_smm1:gap-10   transition-all duration-300  flex items-center justify-around  text-gray-100  shadow-md  `,
  }

  const showFitlerMenu = () => {
    setFilterDisplay(true)
  }
  const hideFilterMenu = () => {
    setFilterDisplay(false)
  }

  const onClickFilterHanlde = () => {
    setFilterDisplay(!filterDisplay)
  }
  const NavVariants = {
    initialAnimation: { y: responsiveHeader ? 0 : zoomIn ? -80 : 0 },
    hover: {
      y: 0,
      transition: { duration: 0 },
    },
  }
  const navigation = useNavigate()
  return (
    <m.div
      variants={NavVariants}
      initial="initialAnimation"
      whileHover="hover"
      className={style.mainDiv}
    >
      <div
        className="h-full flex items-center "
        onMouseEnter={showFitlerMenu}
        onMouseLeave={hideFilterMenu}
        onClick={onClickFilterHanlde}
      >
        <button className="flex   max_smm1:text-[12px]  max_smm1:w-auto  max_smm1:justify-center  max_smm1:gap-1  items-center font-mono justify-around w-[9rem] text-[1.4rem]">
          <MdFilterList className="text-[2rem]  max_smm1:text-[1.5rem] " />
          Filter
        </button>
      </div>
      <button
        onClick={() => navigation('/')}
        className="text-4xl font-mono  max_smm1:text-[1.5rem] 	 font-mono flex items-center justify-around"
      >
        FindDev <BsSearchHeart />
      </button>
      {!StateAuth.userData.sub ? (
        <div
          className="flex  hover:bg-[#fe3c72]  max_smm1:text-[12px]  items-center justify-center gap-2 outline outline-[1px] outline-white rounded-[20px] p-2 cursor-pointer  "
          onClick={() => DispatchAuth({ type: 'AUTH_POP_UP', payload: true })}
        >
          <AiOutlineLogin /> <h1>Login</h1>
        </div>
      ) : (
        <div
          className="bg-yellow-400 p-[2px] rounded-[50%]  items-center justify-center flex     cursor-pointer relative"
          onClick={() => setProfileDrop(!profileDrop)}
        >
          <img
            className=" w-[50px] h-[50px] rounded-[50%]  max_smm:w-[30px]  max_smm:h-[30px]"
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
      <div
        onClick={() => setZoomIn(!zoomIn)}
        className="absolute text-[2rem] max_md2:hidden flex items-center justify-center cursor-pointer right-10"
      >
        <MdZoomInMap
          title="Zoom in"
          className="hover:text-[2.5rem]  transition-all duration-300"
        />
      </div>
      <Auth />
      {filterDisplay && (
        <Filter onMouseEnter={showFitlerMenu} onMouseLeave={hideFilterMenu} />
      )}
    </m.div>
  )
}

export default Header
