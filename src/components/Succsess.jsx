import React from 'react'

const Succsess = ({ succsess }) => {
  return (
    <>
      {succsess && (
        <p className="fixed p-5 bg-green-300 shadow-md left-2 top-[80%] transform  text-center text-white font-bold w-[250px] h-[100px] rounded-[9px] flex items-center justify-center text-[1rem] animate-slide-in">
          {succsess}
        </p>
      )}
    </>
  )
}

export default Succsess
