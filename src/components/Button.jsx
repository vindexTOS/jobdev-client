import React from 'react'

const Button = ({ children, func }) => {
  return (
    <div
      onClick={() => func(children.toLowerCase())}
      className="relative  p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md text-gray-800 hover:text-white cursor-pointer"
    >
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-20 py-3 transition-all ease-out bg-white rounded-md group-hover:bg-opacity-0 duration-400">
        <span className="relative ">{children}</span>
      </span>
    </div>
  )
}

export default Button
