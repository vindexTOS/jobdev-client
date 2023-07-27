import React, { useState, useEffect } from 'react'
import { JobTitleSelect } from '../MOCK_DATA/ResumeDropDownData'
import { UseMainContext } from '../../context'
const Filter = ({ onMouseEnter, onMouseLeave }) => {
  const { DispatchData } = UseMainContext()

  const style = {
    mappedDiv: `  absolute top-[3rem] bg-white shadow-md  w-[100%] z-50 overflow-y-scroll  element-without-scrollbar  max-h-[200px] items-center flex flex-col rounded-b-[9px]  rounded-t-[6px] boxshaddow `,
    selectItem: `hover:bg-gray-200 text-gray-500 text h-[2.5rem] hover:text-gray-800 w-[100%] rounded-[5px] cursor-pointer flex items-center justify-center`,
  }
  const FixedArray = [{ title: 'All', _id: 5 }, ...JobTitleSelect]
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="  h-[120px] w-[200px] absolute left-[6%] top-[40%] z-50 rounded-md flex flex-col"
    >
      <div className={style.mappedDiv}>
        {FixedArray.map((val) => {
          return (
            <div
              key={val._id}
              onClick={() =>
                DispatchData({
                  type: 'FILTER_QUERY',
                  payload: val.title === 'All' ? '' : val.title,
                })
              }
              className={style.selectItem}
            >
              {val.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Filter
