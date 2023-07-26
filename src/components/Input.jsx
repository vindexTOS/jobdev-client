import React, { useEffect, useRef } from 'react'

import { UseMainContext } from '../../context'

const Input = ({
  stateType,
  dispatchType,
  title,
  type,
  required,
  miniTitle,
}) => {
  const { StateResume, DispatchResume } = UseMainContext()
  const style = {
    mainDiv: `w-72 `,
    inputWrapper: `relative h-10 w-full min-w-[200px]`,
    input: `peer text-[#ef4a75] shadow-md h-[3rem] w-[20rem] rounded-[7px] border r  border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#ef4a75] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`,
    label: `before:content[' ']  after:content[' ']  pointer-events-none absolute left-0 -top-1.5 flex h-[3rem] w-[20rem] select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`,
    p: `text-[12px] text-gray-300 ml-2`,
  }
  return (
    <div className={style.mainDiv}>
      <p className={style.p}>{miniTitle}</p>
      <div className={style.inputWrapper}>
        <input
          required={required}
          value={StateResume[stateType]}
          type={type ? type : 'text'}
          onChange={(e) =>
            DispatchResume({
              type: String(dispatchType),
              payload: e.target.value,
            })
          }
          className={style.input}
          placeholder=" "
        />
        <label className={style.label}>{String(title)}</label>
      </div>
    </div>
  )
}

export default Input
