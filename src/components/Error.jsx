const Error = ({ error }) => {
  return (
    <>
      {error && (
        <p className="fixed bg-red-600 shadow-md left-2 top-[80%] transform  text-white w-[250px] h-[100px] rounded-[9px] flex items-center justify-center text-[1.2rem] animate-slide-in">
          {error}
        </p>
      )}
    </>
  )
}

export default Error
