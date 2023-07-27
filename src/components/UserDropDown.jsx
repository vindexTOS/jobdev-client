import React from 'react'
import { AiOutlineProfile } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { UseMainContext } from '../../context'
const UserDropDown = ({ img, id }) => {
  const { StateAuth } = UseMainContext
  const cookies = new Cookies()
  const style = {
    mainDiv: ` z-50 flex flex-col absolute  py-5  items-center justify-around bg-white shadow-md rounded-[10px] h-[300px] w-[300px]  top-[4.4rem] left-[-5rem]`,
    btn: `flex  items-center justify-around bg-yellow-400/90 hover:bg-[#f51b51]/80 rounded-[12px] boxshaddow text-white font-bold w-[240px] h-[3rem] hover:text-gray-300`,
    img: `w-[2rem] h-[2rem]  rounded-[50%]`,
    icon: `text-[#2e2d2d]  text-[2rem] w-[5rem] cursor-pointer`,
  }
  const logOut = () => {
    cookies.remove('jwt_authorization')
  }
  const navigation = useNavigate()
  return (
    <div className={style.mainDiv}>
      <button
        onClick={() => navigation(`myprofile`)}
        className="flex items-center justify-center w-[100%] hover:outline-2 hover:outline hover:outline-yellow-400 rounded-[5px] p-2"
      >
        <img className={style.img} src={img} />
        <p className="text-yellow-400 w-[6rem]">Your Profile</p>
      </button>
      <button
        onClick={() => navigation('upload')}
        className="flex text-gray-600  w-[100%] items-center  justify-around text-[1.2rem] hover:outline-2 hover:outline hover:outline-yellow-400 rounded-[5px] p-2"
      >
        <span> Upload Resume</span> <AiOutlineProfile />
      </button>
      <button
        onClick={() => navigation(`user/${id}`)}
        className="flex text-gray-600  w-[100%] items-center  justify-around text-[1.2rem] hover:outline-2 hover:outline hover:outline-yellow-400 rounded-[5px] p-2"
      >
        <span> My Resume</span> <AiOutlineProfile />
      </button>
      <button
        onClick={() => {
          logOut(), navigation('/')
        }}
        className={style.btn}
      >
        Log out
      </button>
    </div>
  )
}

export default UserDropDown
