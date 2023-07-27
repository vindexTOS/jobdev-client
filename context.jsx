import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'
import axios from 'axios'
import { baseUrl } from './src/globals/url'

import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
const Context = createContext(null)

export const ContextProvider = ({ children }) => {
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
  // re setting headers after page reload
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      const decoded = jwt(token)

      DispatchAuth({ type: 'DECOD_USER', payload: decoded })
    }
  }, [token])

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

  /// resume saving functionality/////// /// local storage//////////////////////////////////////////////////////////////////////////////////

  const [savedResumes, setSavedResumes] = useState([])
  const [saveErr, setSaveErr] = useState('')
  const save = (data) => {
    const isDuplicate = savedResumes.some((resume) => resume._id === data._id)
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
  const [imgLoading, setImgLoading] = useState(false)
  const [imgError, setImgError] = useState('')

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

  // progressBar UI element counter ////
  const [progressBar, setProgressBar] = useState(0)

  return (
    <Context.Provider
      value={{
        // auth
        //auth state
        StateAuth,
        DispatchAuth,
        token,
        cookies,

        //resume
        StateResume,
        DispatchResume,
        // main data
        data,
        setData,
        // local storage
        save,
        savedResumes,
        // ui
        progressBar,
        setProgressBar,

        // IMAGE UPLOAD STATE
        image,
        setImage,
        htmlImg,
        setHtmlImg,
        imgUrl,
        setImgUrl,
        imgLoading,
        setImgLoading,
        imgError,
        setImgError,
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
