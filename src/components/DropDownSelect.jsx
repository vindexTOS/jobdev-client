import React, { useState } from 'react'
import { RiArrowDropUpFill, RiArrowDropDownFill } from 'react-icons/ri'
import useOutClick from '../hooks/useOutClick'
import { UseMainContext } from '../../context'
const DropDownSelect = ({ filterData, stateType, defaultString, type }) => {
  const { StateResume, DispatchResume } = UseMainContext()
  const style = {
    mainDiv: ` relative   w-72 max_smm:right-10  max_smm:right-0  max_xl:w-[15rem] `,
    inputWrapper: `relative h-10 w-full    max_xl:w-[15rem]`,
    input: `peer text-[#ef4a75] shadow-md h-[3rem] w-[20rem]   max_xl:w-[15rem] rounded-[7px] border r  border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#ef4a75] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`,
    label: `before:content[' ']  after:content[' ']     pointer-events-none absolute left-0 -top-1.5 flex h-[3rem] max_xl:w-[15rem] w-[20rem] select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`,
    p: `text-[12px] text-gray-300 ml-2`,
    inputDivWrapper: `flex items-center justify-center  max_xl:relative   `,
    arrowDiv: `flex items-center justify-around z-40 mt-2   text-[2rem]  cursor-pointer max_xl:absolute max_xl:right-1`,
    mappedDiv: `  absolute top-[3rem] bg-white shadow-md  w-[100%] z-50 overflow-y-scroll  element-without-scrollbar  max-h-[200px] items-center flex flex-col rounded-b-[9px]  rounded-t-[6px] boxshaddow `,
    selectItem: `hover:bg-gray-200 h-[2rem] hover:text-gray-800 w-[100%] rounded-[5px] cursor-pointer flex items-center justify-center`,
  }
  const [search, setSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const dropDownRef = React.useRef()
  const handleDropDownCancle = () => {
    setDropDown(false)
  }
  useOutClick(dropDownRef, handleDropDownCancle)
  return (
    <div ref={dropDownRef} className={style.mainDiv}>
      <div
        onClick={() => setDropDown(!dropDown)}
        className={style.inputDivWrapper}
      >
        <div className={style.inputWrapper}>
          <input
            onChange={(e) => setSearch(String(e.target.value))}
            value={search}
            className={style.input}
          />
          <label className={style.label}>
            {StateResume[stateType]
              ? String(StateResume[stateType])
              : String(stateType)}
          </label>
        </div>
        <div className={style.arrowDiv} onClick={() => setDropDown(!dropDown)}>
          {dropDown ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
        </div>
      </div>
      {/*  */}

      {dropDown && (
        <div className={style.mappedDiv}>
          {filterData
            .filter((val) => {
              if (search === '') {
                return val
              } else if (
                val.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return val
              }
            })
            .map((val) => {
              return (
                <div
                  key={val._id}
                  onClick={() => {
                    DispatchResume({ type: type, payload: val.title }),
                      setDropDown(false),
                      setSearch(val.title)
                  }}
                  className={style.selectItem}
                >
                  {val.title}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default DropDownSelect
