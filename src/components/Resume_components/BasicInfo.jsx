import React from 'react'
import Input from '../Input'
import { UseMainContext } from '../../../context'
const BasicInfo = () => {
  const { handleClick } = UseMainContext()
  const style = {}
  return (
    <div>
      <Input text="text" title="Job Title" />
      <Input text="text" title="Job Title" />
      <Input text="text" title="Job Title" />
      <Input text="text" title="Job Title" />
      <Input text="text" title="Job Title" />
      <Input text="text" title="Job Title" />
      {/* <button onClick={handleClick}>SUbmit</button> */}
    </div>
  )
}

export default BasicInfo
