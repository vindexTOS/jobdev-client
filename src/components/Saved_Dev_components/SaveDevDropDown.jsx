import React from 'react'
import Disk from '../../assets/photos/floppy-disk.png'
import { UseMainContext } from '../../../context'

const SaveDevDropDown = () => {
  const { savedResumes } = UseMainContext()
  const style = {
    mainDiv: ` fixed z-50    w-[500px] h-[500px]  left-10 top-9   flex items-center justify-centeir `,
    img: ` floating-img    w-[50px]  cursor-pointer   transform  text-[1.2rem] animate-slide-in   z-50`,
  }
  return (
    <div className={style.mainDiv}>
      <img className={style.img} src={Disk} />
      {savedResumes.map((val) => {
        return (
          <div className="absolute rounded shadow bg-white overflow-hidden   peer-checked:flex flex-col w-full mt-1 border border-gray-200">
            <div className="cursor-pointer group border-t">
              <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"></a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SaveDevDropDown
