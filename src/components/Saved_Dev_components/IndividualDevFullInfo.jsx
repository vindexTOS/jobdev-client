import React from 'react'
import Resume from '../Resume'
import { UseMainContext } from '../../../context'
import { useParams } from 'react-router-dom'
const IndividualDevFullInfo = () => {
  const { devId } = useParams()
  const { savedResumes } = UseMainContext()
  const singleDev = savedResumes.find((val) => val._id === devId)
  return (
    <div>
      <Resume data={singleDev} />
    </div>
  )
}

export default IndividualDevFullInfo
