import React, { useEffect } from 'react'
import { UseMainContext } from '../../context'
import Resume from '../components/Resume'
import axios from 'axios'
import { baseUrl } from '../globals/url'
import { TiDelete } from 'react-icons/ti'
import { FaHeart } from 'react-icons/fa'
import FindDevSkeleton from '../components/Loading_skeletons/FindDevSkeleton'
import Succsess from '../components/Succsess'
const FindDev = () => {
  const { data, setData, save, StateData, saveMsg } = UseMainContext()
  const style = {
    mainDiv: `h-[100%] gap-10  flex flex-col justify-around`,
    btnWrapper: `w-[100%] flex pt-2  items-center justify-around`,
    savebtn: ` text-[#fd5564] hover:text-[#fe6c85] text-[6rem] cursor-pointer `,
    nextbtn: `  bg-green-300 text-white p-2 rounded-[50%] w-[60px] h-[60px] flex items-center justify-center  text-[2.3rem] cursor-pointer`,
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
          <TiDelete className={style.savebtn} onClick={nextUser} />

          <div className={style.nextbtn} onClick={() => save(data)}>
            <FaHeart />
          </div>
        </div>
        <Succsess succsess={saveMsg} />
      </div>
    )
  }
}

export default FindDev
