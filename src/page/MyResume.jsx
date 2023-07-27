import React, { useEffect, useState } from 'react'
import Resume from '../components/Resume'
import FindDevSkeleton from '../components/Loading_skeletons/FindDevSkeleton'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../globals/url'
import axios from 'axios'
const MyResume = () => {
  const { devId } = useParams()
  const [resumeData, setResumeData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/resume/${devId}`)

        setResumeData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }
    fetchData()
  }, [devId])

  useEffect(() => {
    console.log(resumeData)
  }, [resumeData])
  if (loading) {
    return <FindDevSkeleton />
  } else if (resumeData && resumeData[0]) {
    return (
      <div>
        <Resume data={resumeData[0]} />
      </div>
    )
  } else {
    return <div>NOT FOUND</div>
  }
}

export default MyResume
