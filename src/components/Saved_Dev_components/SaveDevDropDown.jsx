import React, { useState, useRef } from 'react'
import Disk from '../../assets/photos/floppy-disk.png'
import { UseMainContext } from '../../../context'
import useOutClick from '../../hooks/useOutClick'
import { useNavigate } from 'react-router-dom'
import { CiSquareRemove } from 'react-icons/ci'
const SaveDevDropDown = () => {
  const { savedResumes, RemoveFromLocalStorage } = UseMainContext()
  const navigation = useNavigate()
  const style = {
    mainDiv: ` fixed z-50    left-10 top-9   flex flex-col   `,
    img: ` floating-img  relative  w-[50px]  cursor-pointer   transform  text-[1.2rem] animate-slide-in   z-50`,
  }
  const [dropDown, setDropDown] = useState(false)
  const dropRef = useRef()

  const handleDropDown = () => {
    setDropDown(false)
  }

  useOutClick(dropRef, handleDropDown)

  return (
    <div className={style.mainDiv}>
      <div className={style.img}>
        <img onClick={() => setDropDown(!dropDown)} src={Disk} />
        <div className="bg-green-400 absolute top-8  rounded-[50%] text-white  items-center justify-center flex  w-[1.4rem]  h-[1.4rem]">
          {savedResumes.length}
        </div>
      </div>

      {dropDown && (
        <div ref={dropRef} className="flex flex-col ">
          {savedResumes?.map((val) => {
            const { firstName, lastName, picturePath } = val
            return (
              <div
                key={val._id}
                className=" relative rounded shadow bg-white    peer-checked:flex flex-col w-full  border border-gray-200"
              >
                <div className="cursor-pointer group border-t">
                  <div
                    onClick={() => navigation(`/developer/${val._id}`)}
                    className="block p-2  flex  items-center justify-around  gap-10  px-5  w-[20rem] border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                  >
                    <img src={picturePath} className="w-[50px] h-[50px]" />
                    <p className="text-gray-600   w-[13rem]">
                      {firstName} {lastName}
                    </p>
                  </div>
                </div>
                <CiSquareRemove
                  onClick={() => {
                    RemoveFromLocalStorage(val._id), navigation('/')
                  }}
                  className="text-[1.4rem]  right-10 top-6 z-50 absolute text-red-500 hover:text-red-800"
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SaveDevDropDown
