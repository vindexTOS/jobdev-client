import React, { useEffect } from 'react'
import { UseMainContext } from '../../context'
import Resume from '../components/Resume'
import axios from 'axios'
import { baseUrl } from '../globals/url'
import { TiDelete } from 'react-icons/ti'
import { FaHeart } from 'react-icons/fa'
import FindDevSkeleton from '../components/Loading_skeletons/FindDevSkeleton'
import Succsess from '../components/Succsess'
import { motion as m } from 'framer-motion'
import { BiSolidSkipNextCircle, BiPauseCircle } from 'react-icons/bi'

const FindDev = () => {
  const { data, setData, save, StateData, saveMsg, zoomIn } = UseMainContext()

  const [btnWrapperDrop, setBtnWrapperDrop] = React.useState(false)

  const style = {
    mainDiv: `h-[100%]    flex flex-col justify-between  `,
    btnWrapper: `w-[100%]   flex items-center justify-around  ${
      zoomIn && 'absolute sticky bottom-1'
    } ${!btnWrapperDrop && 'backdrop-blur-sm'} `,
    savebtn: `text-[6rem] cursor-pointer text-[#fd5564] hover:text-[#fe6c85]`,
    nextbtn: `  bg-green-300 text-white p-2 rounded-[50%] w-[60px] h-[60px] flex items-center justify-center  text-[2.3rem] cursor-pointer`,
    ShowBtnIcon: `text-blue-400/20 hover:text-blue-300  cursor-pointer z-50    text-[5rem] `,
  }
  const [skeletonLoad, setSkeletonLoad] = React.useState(false)

  // function to trigger the useEffect above
  const nextUser = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/resume?jobTitle=${StateData.filterQuery}`,
      )
      setSkeletonLoad(true)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }
  const btnWrapperVariants = {
    initialAnimation: { opacity: 1 },
    animation: { opacity: zoomIn && btnWrapperDrop ? 0 : 1 },
  }
  if (!data) {
    return <FindDevSkeleton />
  }
  if (skeletonLoad) {
    setTimeout(() => {
      setSkeletonLoad(false)
    }, 600)
    return <FindDevSkeleton />
  } else {
    return (
      <div className={style.mainDiv}>
        <Resume data={data} />
        {/* <button onClick={() => console.log(data)}>CLIC</button> */}

        <div className={style.btnWrapper}>
          <m.div
            variants={btnWrapperVariants}
            initial="initialAnimation"
            animate="animation"
          >
            <TiDelete className={style.savebtn} onClick={nextUser} />
          </m.div>

          <m.div
            variants={btnWrapperVariants}
            initial="initialAnimation"
            animate="animation"
            className={style.nextbtn}
            onClick={() => save(data)}
          >
            <FaHeart />
          </m.div>
          {zoomIn && (
            <>
              {btnWrapperDrop ? (
                <BiSolidSkipNextCircle
                  title="Find next dev"
                  onClick={() => setBtnWrapperDrop(!btnWrapperDrop)}
                  className={style.ShowBtnIcon}
                />
              ) : (
                <BiPauseCircle
                  onClick={() => setBtnWrapperDrop(!btnWrapperDrop)}
                  className={style.ShowBtnIcon}
                />
              )}
            </>
          )}
        </div>
        <Succsess succsess={saveMsg} />
      </div>
    )
  }
}

export default FindDev
