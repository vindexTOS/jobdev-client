import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { mock_data } from './src/MOCK_DATA/data'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { baseUrl } from './src/globals/url'
import { storage } from './src/firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const { register, getValues, reset, watch } = useForm()

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
    console.log(BaisicInfoCheck)
    if (string === 'next' && progressBar <= 3) {
      if (BaisicInfoCheck) {
        setProgressBar((prevProgressBar) => prevProgressBar + 1)
      }
    } else if (string === 'back' && progressBar >= 0) {
      setProgressBar((prevProgressBar) => prevProgressBar - 1)
    }
  }

  // basici info

  //SKILLS/////////////////
  const [technologies, setTechnologies] = useState([])

  const addSkill = () => {
    let skill = getValues('skill')
    if (skill) {
      setTechnologies([...technologies, skill])
      reset({ skill: '' })
    }
  }
  const RemoveSkill = (skill) => {
    let newArr = technologies.filter((val) => val !== skill)
    setTechnologies(newArr)
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
    if (company && position && date && desc) {
      setWorkExperience([...workExperience, obj])
    }
  }

  const RemoveWork = (index) => {
    let newArr = workExperience.filter((val, i) => i !== index)
    setWorkExperience(newArr)
  }

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
    if (school && degree && date && desc) {
      setEducation([...education, obj])
    }
  }
  const RemoveEducation = (index) => {
    let newArr = education.filter((val, i) => i !== index)
    setEducation(newArr)
  }
  // sending all the information to data base

  // uploading photo
  const [image, setImage] = useState(null)
  const [htmlImg, setHtmlImg] = useState(null)
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const imgUpload = (e) => {
    if (!image) {
      let newImg = image
      let newHtmlImg = htmlImg
      if (e.target.files) {
        newImg = e.target.files[0]
        newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        setHtmlImg(newHtmlImg)
      }
    }
  }
  const imgUploadDrag = (e) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }
  const uploadFileToFirebaseStorage = async () => {
    if (image) {
      const storageRef = ref(storage, 'forum/' + image.name)
      setLoading(true)
      setError('')
      try {
        const snapshot = await uploadBytesResumable(storageRef, image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        setImgUrl(downloadURL)
        setLoading(false)
        console.log('succsess')

        removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    } else {
      setError('Please Select The File!')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }
  useEffect(() => {
    if (image) {
      uploadFileToFirebaseStorage()
    }
  }, [image])
  const watchName = watch('firstName')
  const PostResume = async () => {
    let firstName = getValues('firstName')
    let lastName = getValues('lasName')
    let jobTitle = getValues('jobTitle')
    let age = getValues('age')
    let email = getValues('email')
    let phoneNumber = getValues('phoneNumber')
    let gitHub = getValues('github')
    let linkedIn = getValues('linkedIn')
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
      picturePath: imgUrl,
      jobExperience,
      education,
      technologies,
      location: 'Georgia',
    }

    console.log(sendingData)
    if (firstName) {
      await axios
        .post(`${baseUrl}/users/create`, sendingData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    } else {
      console.log(firstName)
    }
  }

  useEffect(() => {
    console.log(getValues('firstName'))
  }, [watchName])
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

        workExperience,
        addToEducation,
        PostResume,
        education,
        imgUploadDrag,
        imgUpload,
        removeImgFromHtml,
        loading,
        imgUrl,
        RemoveSkill,
        RemoveWork,
        RemoveEducation,
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
