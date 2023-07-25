import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { mock_data } from './src/MOCK_DATA/data'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { baseUrl } from './src/globals/url'
import { storage } from './src/firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const { register, getValues, reset, watch } = useForm()
  const navigation = useNavigate()
  // data and API calls

  // authentication/ registaration / login / sign in /////////////////////////////////////////////////////////

  const [authPopUp, setAuthPopUp] = useState(false) // opening up authentication form
  const [userData, setUserData] = useState() //decoded user data from cookies
  const cookies = new Cookies() // cookie setter and getter package
  const token = cookies.get('jwt_authorization') // getting token from cookies
  const [authLoading, setAuthLoading] = useState(false) // loading for registration and logi
  const handleRegister = async () => {
    setAuthLoading(true) // setting loading to true

    /// getting state from form hook
    let password = getValues('password')
    let confirmPassword = getValues('repeatpassword')
    let email = getValues('email')
    // putting state to object
    let body = {
      password,
      confirmPassword,
      email,
    }
    //sending respons
    const data = await axios
      .post(`${baseUrl}/user/register`, body)
      .then((res) => res.data)
      .catch((err) => console.log(err))
    // setting up token to header and storing it to cookies
    const newToken = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    const decoded = jwt(newToken)
    setUserData(decoded)
    cookies.set('jwt_authorization', newToken, {
      expires: new Date(decoded.exp * 1000),
    })

    // turning off loading and navigating to user page
    setAuthLoading(false)
    setAuthPopUp(false)
    navigation('user')
  }

  const handleLogin = async () => {
    setAuthLoading(true)
    let password = getValues('password')
    let email = getValues('email')
    let body = {
      password,
      email,
    }

    const data = await axios
      .post(`${baseUrl}/user/login`, body)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    const newToken = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    const decoded = jwt(newToken)
    setUserData(decoded)

    cookies.set('jwt_authorization', newToken, {
      expires: new Date(decoded.exp * 1000),
    })
    setAuthLoading(false)
    setAuthPopUp(false)
    navigation('user')
  }

  const logOut = () => {
    cookies.remove('jwt_authorization')
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      const decoded = jwt(token)

      setUserData(decoded)
    }
  }, [token])

  /////////////////////////////////////////////////////////////////////////////////
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/resume`)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

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

  /// resume saving functionality/////// /// local storage////////////////////////////////////////////////////////

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
  const [resumeError, setResumeError] = useState('')
  const [resumeSuccsess, setResumeSuccsess] = useState('')
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
      if (BaisicInfoCheck) {
        setProgressBar((prevProgressBar) => prevProgressBar + 1)
      } else {
        setResumeError('Fill out all the fields')
        setProgressBar((prevProgressBar) => (prevProgressBar = 0))
        setTimeout(() => {
          setResumeError('')
        }, 3000)
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

  const [postError, setPostError] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccsess, setPostSuccsess] = useState('')
  const PostResume = async () => {
    setPostLoading(true)
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
    if (userData) {
      await axios
        .post(`${baseUrl}/resume/create/${userData.sub}`, sendingData)
        .then((res) => console.log(res))
        .catch((err) => {
          setPostError(err.message)
          console.log(err)
        })

      setPostLoading(false)
      setPostSuccsess('Your resume has been submited succsessfuily')
      setTimeout(() => {
        setPostSuccsess('')
      }, 10000)
    }
  }

  // useEffect(() => {
  //   console.log(getValues('firstName'))
  // }, [watchName])
  return (
    <Context.Provider
      value={{
        // auth
        handleRegister,
        handleLogin,
        authLoading,
        userData,
        data,
        nextUser,
        resumeIndex,
        save,
        register,
        getValues,
        handleProgressBar,
        progressBar,
        setProgressBar,
        resumeError,
        addSkill,
        technologies,
        addToWorkExperience,

        workExperience,
        addToEducation,
        PostResume,
        postSuccsess,
        postError,
        postLoading,
        education,
        imgUploadDrag,
        imgUpload,
        removeImgFromHtml,
        loading,
        imgUrl,
        RemoveSkill,
        RemoveWork,
        RemoveEducation,
        authPopUp,
        setAuthPopUp,
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
