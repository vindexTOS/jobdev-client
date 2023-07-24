import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { mock_data } from './src/MOCK_DATA/data'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { baseUrl } from './src/globals/url'
const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const { register, getValues, reset } = useForm()

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
  // resume builder functionality /////////////

  const [progressBar, setProgressBar] = useState(0)

  const handleProgressBar = (string) => {
    let firstName = getValues('firstName')
    let lastName = getValues('lasName')
    let jobTitle = getValues('jobTitle')
    let age = getValues('age')
    let email = getValues('email')
    let phoneNumber = getValues('phoneNumber')
    let gitHub = getValues('github')
    let linkedIn = getValues('linkedIn')
    let BaisicInfoCheck =
      firstName && lastName && jobTitle && age && email ? true : false

    if (string === 'next' && progressBar <= 3) {
      // if (BaisicInfoCheck) {

      setProgressBar((prevProgressBar) => prevProgressBar + 1)
      // }
    } else if (string === 'back' && progressBar >= 0) {
      setProgressBar((prevProgressBar) => prevProgressBar - 1)
    }
  }

  // basici info
  const [technologies, setTechnologies] = useState([])

  const addSkill = () => {
    let skill = getValues('skill')

    setTechnologies([...technologies, skill])
    reset({ skill: '' })
  }

  // work experience
  const [workExperience, setWorkExperience] = useState([])

  const addToWorkExperience = () => {
    let company = getValues('company')
    let position = getValues('position')
    let date = getValues('date')
    let desc = getValues('desc')
    let obj = {
      company,
      position,
      date,
      desc,
    }

    setWorkExperience([...workExperience, obj])
  }

  const [workExperienceBlockCount, setWorkExperienceBlockCount] = useState(1)
  const AddMoreWork = () => {
    setWorkExperienceBlockCount(
      (prevWorkExperienceNum) => prevWorkExperienceNum + 1,
    )
  }

  useEffect(() => {
    console.log(workExperience)
  }, [workExperienceBlockCount, workExperience])

  // education
  const [education, setEducation] = useState([])
  const addToEducation = () => {
    let school = getValues('school')
    let degree = getValues('degree')
    let date = getValues('date')
    let desc = getValues('desc')
    let obj = {
      school,
      degree,
      date,
      desc,
    }

    setEducation([...education, obj])
  }
  const [educationBlockCount, setEducationBlockCount] = useState(1)
  const AddEducation = () => {
    setEducationBlockCount((prevEducationNum) => prevEducationNum + 1)
  }

  // sending all the information to data base

  const PostResume = async () => {
    let firstName = getValues('firstName')
    let lastName = getValues('lasName')
    let jobTitle = getValues('jobTitle')
    let age = getValues('age')
    let email = getValues('email')
    let phoneNumber = getValues('phoneNumber')
    let gitHub = getValues('github')
    let linkedIn = getValues('linkedIn')
    let picturePath = 'greatest photo ever existed on the planet eearth'
    let jobExperience = workExperience

    let sendingData = {
      firstName,
      lastName,
      jobTitle,
      age,
      email,
      phoneNumber,
      gitHub,
      linkedIn,
      picturePath,
      jobExperience,
      education,
      technologies,
      location: 'Georgia',
    }

    console.log(sendingData)

    await axios
      .post(`${baseUrl}/users/create`, sendingData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return (
    <Context.Provider
      value={{
        data,
        nextUser,
        resumeIndex,
        save,
        register,
        getValues,
        handleProgressBar,
        progressBar,
        setProgressBar,
        addSkill,
        technologies,
        addToWorkExperience,
        workExperienceBlockCount,
        AddMoreWork,
        AddEducation,
        educationBlockCount,
        addToEducation,
        PostResume,
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
