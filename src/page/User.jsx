import React from 'react'
import { UseMainContext } from '../../context'

const User = () => {
  const { StateAuth } = UseMainContext()

  if (!StateAuth.userData.sub) {
    return <div>Login or Register</div>
  }
  return (
    <div>
      <button onClick={() => console.log(StateAuth.userData)}>Click</button>
    </div>
  )
}

export default User
