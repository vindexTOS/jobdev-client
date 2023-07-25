import React from 'react'
import { UseMainContext } from '../../context'

const User = () => {
  const { userData } = UseMainContext()

  if (!userData) {
    return <div>Login or Register</div>
  }
  return (
    <div>
      <button onClick={() => console.log(userData)}>Click</button>
    </div>
  )
}

export default User
