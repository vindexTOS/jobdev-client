import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useReducer,
} from 'react'
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
  const cookies = new Cookies() // cookie setter and getter package
  const token = cookies.get('jwt_authorization') // getting token from cookies
  // authentication/ registaration / login / sign in ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const AuthInitalState = {
    email: '',
    password: '',
    confirmPassword: '',
    authLoading: false,
    authError: '',
    authSuccsess: '',
    authPopUp: false,
    userData: {},
  }
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case 'EMAIL':
        return { ...state, email: (state.email = action.payload) }
      case 'PASSWORD':
        return { ...state, password: (state.password = action.payload) }
      case 'CONFIRM_PASSWORD':
        return {
          ...state,
          confirmPassword: (state.confirmPassword = action.payload),
        }
      case 'AUTH_POP_UP':
        return { ...state, authPopUp: (state.authPopUp = action.payload) }
      case 'AUTH_LOADING':
        return { ...state, authLoading: (state.authLoading = action.payload) }
      case 'AUTH_ERROR':
        return { ...state, authError: (state.authError = action.payload) }
      case 'AUTH_SUCCSESS':
        return { ...state, authSuccsess: (state.authSuccsess = action.payload) }

      case 'DECOD_USER':
        return { ...state, userData: (state.userData = action.payload) }

      default:
        return state
    }
  }
  const [StateAuth, DispatchAuth] = useReducer(AuthReducer, AuthInitalState)

  const handleRegister = async () => {
    DispatchAuth({ type: 'AUTH_LOADING', payload: true })
    let body = {
      password: StateAuth.password,
      confirmPassword: StateAuth.confirmPassword,
      email: StateAuth.email,
    }

    const data = await axios
      .post(`${baseUrl}/user/register`, body)
      .then((res) => res.data)
      .catch((err) => {
        // DispatchAuth({ type: 'AUTH_ERROR', payload: err.message })
        console.log(err)
      })
    // setting up token to header and storing it to cookies
    const newToken = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    const decoded = jwt(newToken)

    DispatchAuth({ type: 'DECOD_USER', payload: decoded })

    cookies.set('jwt_authorization', newToken, {
      expires: new Date(decoded.exp * 1000),
    })

    // turning off loading and navigating to user page
    DispatchAuth({ type: 'AUTH_LOADING', payload: false })
    DispatchAuth({ type: 'AUTH_POP_UP', payload: false })
    // navigation('user')
  }
  //login ///////////////////
  const handleLogin = async () => {
    DispatchAuth({ type: 'AUTH_LOADING', payload: true })
    let body = {
      password: StateAuth.password,
      email: StateAuth.email,
    }
    const data = await axios
      .post(`${baseUrl}/user/login`, body)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    const newToken = data.access_token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    const decoded = jwt(newToken)
    DispatchAuth({ type: 'DECOD_USER', payload: decoded })
    cookies.set('jwt_authorization', newToken, {
      expires: new Date(decoded.exp * 1000),
    })
    DispatchAuth({ type: 'AUTH_LOADING', payload: false })
    DispatchAuth({ type: 'AUTH_POP_UP', payload: false })
    // navigation('user')
  }
  const logOut = () => {
    cookies.remove('jwt_authorization')
  }
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      const decoded = jwt(token)

      DispatchAuth({ type: 'DECOD_USER', payload: decoded })
    }
  }, [token])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // getting data from server /

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

  //   next resume functionality and states///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  /// resume saving functionality/////// /// local storage//////////////////////////////////////////////////////////////////////////////////

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

  //

  // uploading photo  to fire base /////// sending all the information to data base //////////////////// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //resume info ///////////////////////////////////////////////////////////////////////////////////////////
  const ResumeInitialState = {
    // basic info state
    firstName: '',
    lastName: '',
    jobTitle: '',
    age: 0,
    email: '',
    phoneNumber: '',
    gitHub: '',
    linkedIn: '',
    location: '',
    picturePath: '',
    //skills
    skill: '',
    technologies: [],
    //work experience state
    workExperience: [],
    company: '',
    position: '',
    workDate: '',
    workDesc: '',
    // education state
    education: [],
    school: '',
    degree: '',
    educationDate: '',
    educationDesc: '',

    //utility state
    postError: '',
    postSuccsess: '',
    postLoading: false,
  }
  const ResumeReducer = (state, action) => {
    switch (action.type) {
      case 'FIRST_NAME':
        return { ...state, firstName: action.payload }

      case 'LAST_NAME':
        return { ...state, lastName: action.payload }

      case 'JOB_TITLE':
        return { ...state, jobTitle: action.payload }

      case 'AGE':
        return { ...state, age: action.payload }

      case 'EMAIL':
        return { ...state, email: action.payload }

      case 'PHONE_NUMBER':
        return { ...state, phoneNumber: action.payload }

      case 'GITHUB':
        return { ...state, gitHub: action.payload }

      case 'LINKEDIN':
        return { ...state, linkedIn: action.payload }

      case 'LOCATION':
        return { ...state, location: action.payload }

      case 'SKILL':
        return { ...state, skill: action.payload }

      case 'SKILL_ARRAY': {
        return {
          ...state,
          technologies: [...state.technologies, action.payload],
        }
      }

      case 'COMPANY':
        return { ...state, company: action.payload }
      case 'POSITION':
        return { ...state, position: action.payload }
      case 'WORK_DATE':
        return { ...state, workDate: action.payload }
      case 'WORK_DEC':
        return { ...state, workDesc: action.payload }

      case 'WORK_ARRAY': {
        return {
          ...state,
          workExperience: [...state.workExperience, action.payload],
        }
      }

      case 'WORK_ARRAY_REMOVE': {
        return {
          ...state,
          workExperience: action.payload,
        }
      }

      case 'CLEAR_WORK_OBJECT': {
        return {
          ...state,
          company: '',
          position: '',
          workDate: '',
          workDesc: '',
        }
      }
      case 'SCHOOL':
        return { ...state, school: action.payload }
      case 'DEGREE':
        return { ...state, degree: action.payload }
      case 'EDUCATION_DATE':
        return { ...state, educationDate: action.payload }
      case 'EDUCATION_DESC':
        return { ...state, educationDesc: action.payload }

      case 'EDUCATION_ARRAY': {
        return {
          ...state,
          education: [...state.education, action.payload],
        }
      }
      case 'EDUCATION_ARRAY_REMOVE': {
        return {
          ...state,
          education: action.payload,
        }
      }
      case 'CLEAN_EDUCATION_OBJECT':
        return {
          ...state,
          school: '',
          degree: '',
          educationDate: '',
          educationDesc: '',
        }
      case 'POST_ERROR':
        return { ...state, postError: action.payload }

      case 'POST_SUCCESS':
        return { ...state, postSuccess: action.payload }

      case 'POST_LOADING':
        return { ...state, postLoading: action.payload }

      default:
        return state
    }
  }
  const [StateResume, DispatchResume] = useReducer(
    ResumeReducer,
    ResumeInitialState,
  )

  // Skills

  const addSkill = () => {
    if (StateResume.skill) {
      DispatchResume({ type: 'SKILL_ARRAY', payload: StateResume.skill })
      DispatchResume({ type: 'SKILL', payload: '' })
    }
  }
  const RemoveSkill = (skill) => {
    let newArr = StateResume.technologies.filter((val) => val !== skill)
    DispatchResume({ type: 'SKILL_ARRAY_REMOVE', payload: newArr })
  }

  // work experience/////////////

  const addToWorkExperience = () => {
    let obj = {
      company: StateResume.company,
      position: StateResume.position,
      date: StateResume.workDate,
      desc: StateResume.workDesc,
    }
    console.log('clicked')
    if (obj.company && obj.position && obj.date && obj.desc) {
      DispatchResume({ type: 'WORK_ARRAY', payload: obj })
      DispatchResume({ type: 'CLEAR_WORK_OBJECT' })
    }
  }

  const RemoveWork = (index) => {
    let newArr = StateResume.workExperience.filter((val, i) => i !== index)
    DispatchResume({ type: 'WORK_ARRAY_REMOVE', payload: newArr })
  }

  // education////////////////////
  const addToEducation = () => {
    let obj = {
      school: StateResume.school,
      degree: StateResume.degree,
      date: StateResume.educationDate,
      desc: StateResume.educationDesc,
    }
    if (obj.school && obj.degree && obj.date && obj.desc) {
      DispatchResume({ type: 'EDUCATION_ARRAY', payload: obj })
      DispatchResume({ type: 'CLEAN_EDUCATION_OBJECT' })
    }
  }
  const RemoveEducation = (index) => {
    let newArr = StateResume.education.filter((val, i) => i !== index)
    DispatchResume({ type: 'EDUCATION_ARRAY_REMOVE', payload: newArr })
  }

  const PostResume = async () => {
    DispatchResume({ type: 'POST_LOADING', payload: true })

    let sendingData = {
      firstName: StateResume.firstName,
      lastName: StateResume.lastName,
      jobTitle: StateResume.jobTitle,
      age: StateResume.age,
      email: StateResume.email,
      phoneNumber: StateResume.phoneNumber,
      gitHub: StateResume.gitHub,
      linkedIn: StateResume.linkedIn,
      picturePath: imgUrl,
      jobExperience: StateResume.workExperience,
      education: StateResume.education,
      technologies: StateResume.technologies,
      location: StateResume.location,
    }

    console.log(sendingData)
    if (StateAuth.userData.sub) {
      await axios
        .post(`${baseUrl}/resume/create/${StateAuth.userData.sub}`, sendingData)
        .then((res) => console.log(res))
        .catch((err) => {
          DispatchResume({ type: 'POST_ERROR', payload: err.message })

          console.log(err)
        })
      DispatchResume({ type: 'POST_LOADING', payload: false })

      DispatchResume({
        type: 'POST_SUCCESS',
        payload: 'Your resume has been submited succsessfuily',
      })

      setTimeout(() => {
        DispatchResume({ type: 'POST_SUCCESS', payload: '' })
      }, 10000)
    }
  }

  // resume progress bar

  const [progressBar, setProgressBar] = useState(0)
  const [resumeError, setResumeError] = useState('')
  const handleProgressBar = (string) => {
    let BaisicInfoCheck =
      StateResume.firstName &&
      StateResume.lastName &&
      StateResume.jobTitle &&
      StateResume.age &&
      StateResume.email
        ? true
        : false

    if (string === 'next' && progressBar <= 3) {
      if (BaisicInfoCheck) {
        setProgressBar((prevProgressBar) => prevProgressBar + 1)
      } else {
        DispatchResume({
          type: 'POST_ERROR',
          payload: 'Fill out all the fields',
        })

        setProgressBar((prevProgressBar) => (prevProgressBar = 0))
        setTimeout(() => {
          DispatchResume({ type: 'POST_ERROR', payload: '' })
        }, 3000)
      }
    } else if (string === 'back' && progressBar >= 0) {
      setProgressBar((prevProgressBar) => prevProgressBar - 1)
    }
  }

  return (
    <Context.Provider
      value={{
        // auth
        //auth state
        StateAuth,
        DispatchAuth,

        handleRegister,
        handleLogin,
        //resume
        StateResume,
        DispatchResume,
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

        addToWorkExperience,

        addToEducation,
        PostResume,

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
