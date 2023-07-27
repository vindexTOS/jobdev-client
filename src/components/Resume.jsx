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
import { Link } from 'react-router-dom'
const Resume = ({ data }) => {
  const [workDrop, setWorkDrop] = useState(true)

  const [educatoinDrop, setEducationDrop] = useState(false)
  const style = {
    mainDiv: `border-solid-2 h-[100%] border-black flex flex-col gap-10  `,
    infoWrapper: `  relative  w-[100%] justify-around flex  p-5 rounded-[5px]   solid border-black   `,
    header: ` flex  items-center justify-center gap-10 text-center bg-gray-200 p-1 rounded-[5px] shadow-md   text-3xl font-medium font-mono text-gray-500`,
    info: `text-gray-600`,
    imgWrapper: `flex justify-around gap-10`,
    img: `w-[300px] h-[300px]`,
    nameHeader: `text-[2rem] text-gray-700`,
    linksDiv: `flex flex-col items-start px-10 justify-around bg-white w-[340px] rounded-[9px] shadow-md`,
    icon: `border-2 p-1 rounded-[50%] border-yellow-400`,
    iconWrapper: `flex  items-center justify-center text-[1.2rem] gap-2`,
    skillsDiv: `pt-10`,
  }

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
          <img
            className={style.img}
            src={data?.picturePath ? data?.picturePath : userdefault}
          />
          <div>
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
              Linkden
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
      <section className="relative">
        <div
          onClick={() => setWorkDrop(!workDrop)}
          className={`${style.header} cursor-pointer`}
        >
          <div className={style.icon}>
            <BiBriefcase />
          </div>
          <h1>Work Experince</h1>
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
            }   z-50 cursor-pointer text-[1.5rem] absolute top-[4rem] text-center w-[100%] text-red-400 font-bold `}
          >
            Read more...
          </p>

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
        </div>
      </section>
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
            }   z-50 cursor-pointer text-[1.5rem] absolute top-[4rem] text-center w-[100%] text-red-400 font-bold `}
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
    </div>
  )
}

export default Resume
