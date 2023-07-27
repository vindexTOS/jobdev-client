import React, { useState, useRef } from 'react'
import { UseMainContext } from '../../../context'
import LoadingComponent from '../Loading'
import { useForm } from 'react-hook-form'
import useOutClick from '../../hooks/useOutClick'
import axios from 'axios'
import Error from '../Error'
import jwt from 'jwt-decode'
import { baseUrl } from '../../globals/url'
const Auth = () => {
  const { token, cookies, StateAuth, DispatchAuth } = UseMainContext()
  const authPopUpRef = useRef(null)
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

  const popUpHanndler = () => {
    DispatchAuth({ type: 'AUTH_POP_UP', payload: false })
  }
  useOutClick(authPopUpRef, popUpHanndler)
  const style = {
    section: `w-[100vw] h-[100vh] bg-black/30 absolute top-[-3rem] flex items-center justify-center z-50 ${
      StateAuth.authPopUp ? '' : 'hidden'
    }`,
    img: `w-[60px]`,

    mainDiv: `w-[550px] h-[600px] py-40 bg-white shadow-2xl justify-around flex flex-col`,
    topDiv: `flex flex-col items-center justify-center `,
    inputDivWrapper: `flex items-center justify-center flex-col gap-5`,
    inputDiv: `outline-[1px] text-gray-700 outline outline-gray-400 w-[50%] rounded-[3px] h-[2.5rem] flex items-center  px-3 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-gray-800/20`,
    btn: `text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm  text-center  w-[50%] h-[2.5rem]`,
    btnRegister: `text-white bg-[#ff5377] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-[#ff5377]-500/50 dark:shadow-lg dark:shadow-[#ff7558]/80 font-medium rounded-lg text-sm  text-center  w-[50%] h-[2.5rem]`,
  }
  const [registerSwitch, setRegisterSwitch] = useState(false)

  return (
    <section className={style.section}>
      <div ref={authPopUpRef} className={style.mainDiv}>
        <div className={style.topDiv}>
          {/* <img className={style.img} src={Icon} /> */}
          <h1 className="text-[2rem] text-gray-600 font-bold">
            {!registerSwitch ? 'Log in to create resume' : 'Sign Up'}
          </h1>
          <p className="text-gray-400">Create free resume</p>
        </div>
        <div className={style.inputDivWrapper}>
          <div className={style.inputDiv}>
            <input
              onChange={(e) =>
                DispatchAuth({ type: 'EMAIL', payload: e.target.value })
              }
              className="outline-none"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={style.inputDiv}>
            <input
              onChange={(e) =>
                DispatchAuth({ type: 'PASSWORD', payload: e.target.value })
              }
              className="outline-none"
              type="password"
              placeholder="Password"
            />
          </div>
          {registerSwitch && (
            <div className={style.inputDiv}>
              <input
                onChange={(e) =>
                  DispatchAuth({
                    type: 'CONFIRM_PASSWORD',
                    payload: e.target.value,
                  })
                }
                className="outline-none"
                type="password"
                placeholder="Re-peat password"
              />
            </div>
          )}
          {registerSwitch ? (
            <button onClick={() => handleRegister()} className={style.btn}>
              Register
            </button>
          ) : (
            <button onClick={() => handleLogin()} className={style.btn}>
              Login
            </button>
          )}
          <LoadingComponent loading={DispatchAuth.authLoading} />
          <Error error={StateAuth.authError} />
        </div>

        {!registerSwitch ? (
          <div className={style.inputDivWrapper}>
            <p className="text-gray-400 mt-5 ">OR</p>

            <button
              onClick={() => setRegisterSwitch(!registerSwitch)}
              className={style.btnRegister}
            >
              Sign Up With Email
            </button>
          </div>
        ) : (
          <div className={style.inputDivWrapper}>
            <p className="text-gray-400 mt-5 ">OR</p>

            <button
              onClick={() => setRegisterSwitch(!registerSwitch)}
              className={style.btnRegister}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Auth
