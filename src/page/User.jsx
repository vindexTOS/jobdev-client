import React from 'react'
import { UseMainContext } from '../../context'
import Resume from '../components/Resume'
import { Link } from 'react-router-dom'
const User = () => {
  const { StateAuth, userResumeData, zoomIn } = UseMainContext()
  const style = {
    mainDiv: ` relative  border-solid-2 items-center justify-center text-gray-500 text-[2rem] text-center  ${
      zoomIn
        ? ' pb-40 pt-10     '
        : ' laptop:h-[400px] pt-[6rem]     gap-10 h-[600px] '
    }       flex flex-col  bg-white   `,
  }
  if (!StateAuth.userData.sub) {
    return <div>Login or Register</div>
  }

  if (userResumeData && userResumeData[0]) {
    return (
      <div>
        <Resume data={userResumeData[0]} />
      </div>
    )
  } else {
    return (
      <div className={style.mainDiv}>
        Currently you do not have a resume, please go to{' '}
        <Link
          className="text-blue-400 underline hover:text-blue-300"
          to="/upload"
        >
          resume maker{' '}
        </Link>
      </div>
    )
  }
}

export default User
