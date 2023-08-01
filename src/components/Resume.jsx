import React from 'react'
import { useState } from 'react'
import { ImGithub } from 'react-icons/im'
import { AiFillLinkedin } from 'react-icons/ai'
import { PiMapPinDuotone, PiUserListFill } from 'react-icons/pi'
import { TfiEmail } from 'react-icons/tfi'
import { TbSchool } from 'react-icons/tb'
import { GrPhone } from 'react-icons/gr'
import { BiBriefcase } from 'react-icons/bi'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import InformationBlock from './InformationBlock'
import userdefault from '../assets/photos/userdefault.jpg'
import { PiFolderOpenFill } from 'react-icons/pi'
import { Link, useParams } from 'react-router-dom'
import { baseUrl } from '../globals/url'
import { UseMainContext } from '../../context'
import { motion as m } from 'framer-motion'

const Resume = ({ data }) => {
  const [workDrop, setWorkDrop] = useState(true)
  const { zoomIn } = UseMainContext()
  const [educatoinDrop, setEducationDrop] = useState(false)
  const style = {
    mainDiv: ` relative  border-solid-2   ${
      zoomIn
        ? ' pb-40 pt-10     '
        : ' laptop:h-[400px] pt-[6rem]  overflow-y-scroll  gap-10 h-[600px] '
    }       flex flex-col  bg-white   `,
    infoWrapper: `   max_x:flex-wrap  max_x:gap-20  relative  w-[100%] justify-around flex  p-5 rounded-[5px]   solid border-black   `,
    header: ` flex max_sm:text-[1rem]  items-center justify-center gap-10 text-center bg-gray-200 p-1 rounded-[5px] shadow-md   text-3xl font-medium font-mono text-gray-500`,
    info: `text-gray-600`,
    imgWrapper: `max_x:flex-wrap max_x:flex  max_x:items-center  max_x:justify-center   max_x:flex-col  max_x:flex-row flex justify-around relative gap-10 `,
    img: `w-[300px] h-[300px] `,
    nameHeader: `text-[2rem] text-gray-700  max_x:text-center`,
    linksDiv: `flex  flex-col  max_x:justify-start max_x:py-3  max_x:gap-5  items-start px-10 justify-around bg-white w-[340px] rounded-[9px] shadow-md`,
    icon: `border-2 p-1 rounded-[50%] border-yellow-400`,
    iconWrapper: `flex  items-center justify-center text-[1.2rem] gap-2`,
    skillsDiv: `pt-10  max_x:flex  max_x:flex-col  max_x:items-center `,
  }
  // const [copy, setCopy] = React.useState('')
  // function copyToClipboard() {
  //   navigator.clipboard
  //     .writeText(`${baseUrl}/user/${data.owner}`)
  //     .then(() => setCopy('Copied!'))
  //     .catch((error) =>
  //       console.error('Error copying text to clipboard:', error),
  //     )
  //   setTimeout(() => {
  //     setCopy('')
  //   }, 2000)
  // }
  const { devId } = useParams()

  const checkResume = devId === data.owner
  return (
    <div className={style.mainDiv}>
      <div className={style.infoWrapper}>
        <h1 className={`${style.header}  w-[90%] absolute top-[-3rem] `}>
          <div className={style.icon}>
            <PiUserListFill />
          </div>
          Personal Information
        </h1>

        <div className={style.imgWrapper}>
          <div>
            <img
              className={style.img}
              src={data?.picturePath ? data?.picturePath : userdefault}
            />
            {!checkResume && (
              <Link
                to={`user/${data.owner}`}
                className=" bottom-2 laptop: left-2  z-30 text-[1.2rem] text-blue-400  flex items-center justify-around w-[200px] "
              >
                <span> Go To Resume</span>{' '}
                <PiFolderOpenFill className="text-yellow-500 text-[1.6rem]" />
              </Link>
            )}
          </div>
          <div className=" max_x:flex  max_x:flex-col  max_x:items-center">
            <h1 className={style.nameHeader}>
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-[1.2rem] text-gray-400">{data.jobTitle}</p>
            <p className="text-[1.2rem] text-gray-400">
              Age: <span className="text-gray-800">{data.age}</span>
            </p>
            <div className={style.skillsDiv}>
              <p className="text-[1.5rem] text-gray-900">Skills</p>
              <div className="flex flex-wrap gap-1 w-[230px]">
                {data?.technologies?.map((val, index) => (
                  <div
                    key={String(index)}
                    className=" shadow-md text-blue-400 p-1 text-[15px] rounded-[9px] bg-gray-100"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={style.linksDiv}>
          <div className={style.iconWrapper}>
            <div className={style.icon}>
              <ImGithub className="text-[#c9510c]" />
            </div>
            <Link target="_blank" className="text-gray-500" to={data.gitHub}>
              Github
            </Link>
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}>
              <AiFillLinkedin className="text-[#0072b1]" />
            </div>
            <Link target="_blank" className="text-gray-500" to={data.linkedIn}>
              Linkedin
            </Link>
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}>
              <PiMapPinDuotone />
            </div>
            <p className="text-gray-500">{data.location}</p>
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}>
              <TfiEmail />
            </div>
            <p className="text-gray-500">{data.email}</p>{' '}
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}>
              <GrPhone />
            </div>
            <p className="text-gray-500">{data.phoneNumber}</p>{' '}
          </div>
        </div>
      </div>
      {data?.jobExperience.length > 0 && (
        <section className="relative">
          <div
            onClick={() => setWorkDrop(!workDrop)}
            className={`${style.header} cursor-pointer`}
          >
            <div className={style.icon}>
              <BiBriefcase />
            </div>
            <h1>Work Experience</h1>
            <div className={style.btnWrapper}>
              {workDrop ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />}
            </div>
          </div>

          <div
            className={` relative  ${
              workDrop ? 'overflow-hidden h-[130px]' : 'pb-20'
            } `}
          >
            <div className={` ${workDrop && 'overLay'}`}></div>
            <p
              onClick={() => setWorkDrop(!workDrop)}
              className={`  ${
                !workDrop && 'hidden'
              }   z-40 cursor-pointer text-[1.5rem] absolute top-[4rem] text-center w-[100%] text-red-400 font-bold `}
            >
              Read more...
            </p>

            <>
              {data?.jobExperience?.map((elem, index) => {
                return (
                  <div key={String(index)} className={style.infoWrapper}>
                    <div className="w-[100%] px-3">
                      <h1 className="text-gray-900 text-[1.5rem] font-bold">
                        {elem.position}
                      </h1>
                      <h2 className="text-gray-600 text-[1.1rem] font-medium">
                        {elem.company}
                      </h2>
                      <h3 className="text-yellow-300 font-bold">{elem.date}</h3>
                      <p className="break-words text-gray-400">{elem.desc}</p>
                    </div>
                  </div>
                )
              })}
            </>
          </div>
        </section>
      )}
      {data?.education.length > 0 && (
        <section>
          <div
            onClick={() => setEducationDrop(!educatoinDrop)}
            className={`${style.header} cursor-pointer`}
          >
            <div className={style.icon}>
              <TbSchool />
            </div>

            <h1>Education </h1>
            <div className={style.btnWrapper}>
              {!educatoinDrop ? (
                <MdOutlineArrowDropDown />
              ) : (
                <MdOutlineArrowDropUp />
              )}
            </div>
          </div>
          <div
            className={` relative ${
              !educatoinDrop && 'overflow-hidden h-[100px]'
            } `}
          >
            <div className={` ${!educatoinDrop && 'overLay'}`}></div>
            <p
              onClick={() => setEducationDrop(!educatoinDrop)}
              className={`  ${
                educatoinDrop && 'hidden'
              }   z-40 cursor-pointer text-[1.5rem] absolute top-[4rem] text-center w-[100%] text-red-400 font-bold `}
            >
              Read more...
            </p>
            {data?.education?.map((elem, index) => {
              return (
                <div key={String(index)} className={style.infoWrapper}>
                  <div className="w-[100%] px-3">
                    <h1 className="text-gray-900 text-[1.5rem] font-bold">
                      {elem.degree}
                    </h1>
                    <h2 className="text-gray-600 text-[1.1rem] font-medium">
                      {elem.school}
                    </h2>
                    <h3 className="text-yellow-300 font-bold">{elem.date}</h3>
                    <p className="break-words text-gray-400">{elem.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

export default Resume
