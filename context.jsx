import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { mock_data } from './src/MOCK_DATA/data'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const { register, getValues } = useForm()

  // data and API calls
  const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/users');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    setData(mock_data)
  }, [])

  //   next resume functionality and states
  const [resumeIndex, setresumeIndex] = useState(1)
  const [prevResumeIndex, setPrevResumeIndex] = useState(-1)
  useEffect(() => {
    // ვქმნი რენდომულად ინდექს, შემდეგ ვადარებ წინა ინდექს,
    // თუ წინა ინდექსი ემთხვევა ახალს, თავიდან ვაგენირრებ ახალ რენდომ ინდექს სანამ არ დაემთხვევა ძველს.
    let newIndex = Math.floor(Math.random() * data.length)
    while (newIndex === prevResumeIndex) {
      newIndex = Math.floor(Math.random() * data.length)
    }
    setresumeIndex(newIndex)
  }, [prevResumeIndex])
  // function to trigger the useEffect above
  const nextUser = () => {
    setPrevResumeIndex(resumeIndex)
  }

  /// resume saving functionality///////

  const [savedResumes, setSavedResumes] = useState([])
  const [saveErr, setSaveErr] = useState('')
  const save = (data) => {
    const isDuplicate = savedResumes.some((resume) => resume.id === data.id)

    if (!isDuplicate) {
      const updatedResumes = [...savedResumes, data]
      setSavedResumes(updatedResumes)

      localStorage.setItem('resumes', JSON.stringify(updatedResumes))
    } else {
      setSaveErr('Resume already on your list')
      setTimeout(() => {
        setSaveErr('')
      }, 3000)
    }
  }

  const storedResumes = localStorage.getItem('resumes')

  useEffect(() => {
    if (storedResumes) {
      const parsedResumes = JSON.parse(storedResumes)
      setSavedResumes(parsedResumes)
    }
  }, [])

  const [dum, setDum] = useState()
  let text = getValues('text')
  const handleClick = () => {
    setDum(text)
  }
  useEffect(() => {
    console.log(text)
  }, [dum])
  return (
    <Context.Provider
      value={{
        data,
        nextUser,
        resumeIndex,
        save,
        register,
        getValues,
        handleClick,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const UseMainContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Not wrapped')
  }
  return context
}
