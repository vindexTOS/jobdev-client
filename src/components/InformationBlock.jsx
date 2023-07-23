import React from 'react'

const InformationBlock = ({ title, data }) => {
  const style = {
    mainDiv: `flex gap-2`,
    title: `text-gray-400 font-sans w-[10rem]  font-medium `,
    info: `text-gray-900  font-mono `,
  }
  return (
    <div className={style.mainDiv}>
      <span className={style.title}>{title}:</span>{' '}
      <span className={style.info}>{data}</span>
    </div>
  )
}

export default InformationBlock
