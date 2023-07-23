import React, { useState, useEffect } from 'react'
import BasicInfo from '../components/Resume_components/BasicInfo'
import { UseMainContext } from '../../context'
const register = () => {
  const { getValues } = UseMainContext()
  const style = {
    mainDiv: `h-[100vh] flex flex-col justify-around`,
  }

  return (
    <div className={style.mainDiv}>
      <BasicInfo />
    </div>
  )
}

export default register
