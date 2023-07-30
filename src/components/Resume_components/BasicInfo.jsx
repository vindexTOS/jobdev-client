import React from 'react'
import Input from '../Input'
import { UseMainContext } from '../../../context'
import ImgUpload from '../ImgUpload'
import LoadingComponent from '../Loading'
import DropDownSelect from '../DropDownSelect'
import { JobTitleSelect, CitySelect } from '../../MOCK_DATA/ResumeDropDownData'
const BasicInfo = () => {
  const { imgLoading, DispatchResume, StateResume } = UseMainContext()
  const style = {
    mainDiv: `   flex flex-col  max_lg:mt-[35rem] items-center justify-center gap-5  h-[100vh]    `,
    topDiv: `w-[100%] max_xl:gap-10    flex max_xl:flex-col lg:flex-row justify-around`,
    personal: `flex  flex-col max_xl:flex-row  max_lg:gap-5  lg:h-auto mx-auto  justify-around`,
    photoDiv: `flex flex-col items-center `,
    contact: `flex justify-around w-[100%]  max_lg:items-center max_lg:justify-center   lg:h-auto lg:flex-nowrap`,
    inputWrapper: `flex flex-col items-center w-[100%] h-[800px]  justify-around gap-10 bg-white p-10 rounded-[8px] shadow-md`,
    header: `text-2xl font-medium font-mono text-gray-500`,

    skills: `flex flex-col justify-center gap-10 items-center w-[100%]  `,
    skillInputWrapper: `flex w-[100%] h-[100%] items-center justify-center gap-10  max_lg:w-[50%]`,
    skillsDiv: `flex gap-2 mr-40 w-[45%] flex-wrap   ml-[10rem] bg-[#fd5564]/70 shadow-md p-2 rounded-[9px]   top-2 left-[-5rem]  z-20`,
    singleSkill: ` shadow-md text-gray-400 p-1 rounded-[9px] bg-gray-100`,
    addBtn: `py-3 px-4 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800`,
  }

  const addSkill = () => {
    if (StateResume.skill) {
      DispatchResume({ type: 'SKILL_ARRAY', payload: StateResume.skill })
      DispatchResume({ type: 'SKILL', payload: '' })
    }
  }
  const RemoveSkill = (skill) => {
    let newArr = StateResume.technologies.filter((val) => val !== skill)
    console.log(newArr)
    DispatchResume({ type: 'SKILL_ARRAY_REMOVE', payload: newArr })
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.inputWrapper}>
        <h1 className={style.header}>Personal Information</h1>
        <div className={style.topDiv}>
          <div className={style.photoDiv}>
            <p className="text-gray-400 font-mono text-[1rem] ">Upload Photo</p>
            <LoadingComponent loading={imgLoading} />
            <ImgUpload />
          </div>
          <div className={style.personal}>
            <Input
              dispatchType="FIRST_NAME"
              stateType="firstName"
              title="Name"
              required={true}
              miniTitle="Legal name*"
            />
            <Input
              dispatchType="LAST_NAME"
              stateType="lastName"
              title="Last Name"
              required={true}
              miniTitle="Family name*"
            />
          </div>
          <div className={style.personal}>
            <DropDownSelect
              filterData={JobTitleSelect}
              stateType="jobTitle"
              defaultString="Job"
              type="JOB_TITLE"
            />
            <DropDownSelect
              filterData={CitySelect}
              stateType="location"
              defaultString="location"
              type="LOCATION"
            />
            <Input
              dispatchType="AGE"
              stateType="age"
              title="Age"
              type="number"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className={style.inputWrapper}>
        <h1 className={style.header}>Contact Information And Links</h1>
        <div className={style.contact}>
          <Input
            dispatchType="EMAIL"
            stateType="email"
            title="Email"
            required={true}
          />
          <Input
            dispatchType="PHONE_NUMBER"
            stateType="phoneNumber"
            title="Phone"
          />
        </div>
        <div className={style.contact}>
          <Input dispatchType="GITHUB" stateType="gitHub" title="GitHub" />
          <Input
            dispatchType="LINKEDIN"
            stateType="linkedIn"
            title="LinkedIn"
          />
        </div>
        <div className={style.skills}>
          <div className={style.skillInputWrapper}>
            <Input dispatchType="SKILL" stateType="skill" title="Skills" />
            <button
              className={style.addBtn}
              type="button"
              onClick={() => addSkill()}
            >
              ADD SKILL
            </button>
          </div>
          {StateResume.technologies.length >= 1 && (
            <div className={style.skillsDiv}>
              {StateResume.technologies.map((val) => {
                return (
                  <div
                    onClick={() => RemoveSkill(val)}
                    key={val}
                    className={style.singleSkill}
                  >
                    {val}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* <button onClick={handleClick}>SUbmit</button> */}
    </div>
  )
}

export default BasicInfo
