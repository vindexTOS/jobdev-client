import React from 'react'

const Header = () => {
  const style = {
    mainDiv: `bg-[#fd5564] h-[5rem] p-10   flex items-center justify-around  text-gray-100 rounded-[5px] shadow-md  `,
  }
  return (
    <div className={style.mainDiv}>
      <button>Filter</button>
      <div className="text-4xl font-mono	"> FindDev</div>

      <button>Upload</button>
    </div>
  )
}

export default Header
