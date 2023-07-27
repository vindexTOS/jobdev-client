import React from 'react'
import { UseMainContext } from '../../context'
import Resume from '../components/Resume'
const User = () => {
  const { StateAuth, userResumeData } = UseMainContext()

  if (!StateAuth.userData.sub) {
    return <div>Login or Register</div>
  }

  if (userResumeData && userResumeData[0]) {
    return (
      <div>
        <Resume data={userResumeData[0]} />
      </div>
    )
  }
}

export default User
