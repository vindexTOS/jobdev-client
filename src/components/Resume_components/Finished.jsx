import React from 'react'
import { UseMainContext } from '../../../context'
import Succsess from '../Succsess'
import Error from '../Error'
import LoadingComponent from '../Loading'
const Finished = () => {
  const { PostResume, postError, postLoading, postSuccsess } = UseMainContext()
  const style = {
    topDiv: `flex flex-col items-center justify-center w-[100%] h-[100vh] gap-10`,
  }
  return (
    <div className={style.topDiv}>
      <p className="text-gray-400 text-[2rem]">
        You can go back and change things, or else submit your resume
      </p>

      <a
        onClick={() => PostResume()}
        className="px-5 cursor-pointer py-2.5 relative rounded group font-medium text-white font-medium inline-block"
      >
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
        <span className="h- w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
        <span className="relative">Submit</span>
      </a>
      <LoadingComponent loading={postLoading} />
      <Succsess succsess={postSuccsess} />
      <Error error={postError} />
    </div>
  )
}

export default Finished
