import React from 'react'
import Input from '../Input'
import { UseMainContext } from '../../../context'
import ImgUpload from '../ImgUpload'
import LoadingComponent from '../Loading'
const BasicInfo = () => {
  const { handleClick, addSkill, technologies, loading } = UseMainContext()
  const style = {
    mainDiv: `flex flex-col items-center justify-center gap-5     `,
    personal: `flex justify-around w-[100%]`,
    contact: `flex justify-around w-[100%]`,
    inputWrapper: `flex flex-col items-center w-[100%] justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,
    skills: `flex flex-col justify-center gap-10 items-center w-[100%]`,
    addBtn: `py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.inputWrapper}>
        <h1 className={style.header}>Personal Information</h1>
        <LoadingComponent loading={loading} />
        <ImgUpload />
        <div className={style.personal}>
          <Input text="firstName" title="Name" required={true} />
          <Input text="lasName" title="Last Name" required={true} />
        </div>
        <div className={style.personal}>
          <Input text="jobTitle" title="Job Title" required={true} />
          <Input text="age" title="Age" type="number" required={true} />
        </div>
      </div>
      <div className={style.inputWrapper}>
        <h1 className={style.header}>Contact Information And Links</h1>
        <div className={style.contact}>
          <Input text="email" title="Email" required={true} />
          <Input text="phoneNumber" title="Phone" />
        </div>
        <div className={style.contact}>
          <Input text="github" title="GitHub" />
          <Input text="linkedIn" title="LinkedIn" />
        </div>
        <div className={style.skills}>
          <div className="flex w-[100%] h-[100%] items-center justify-center gap-10">
            <Input text="skill" title="technologies" />
            <button
              className={style.addBtn}
              type="button"
              onClick={() => addSkill()}
            >
              ADD SKILL
            </button>
          </div>
          <div>
            {technologies?.map((val) => (
              <p key={val}>{val}</p>
            ))}
          </div>
        </div>
      </div>

      {/* <button onClick={handleClick}>SUbmit</button> */}
    </div>
  )
}

export default BasicInfo
