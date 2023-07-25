import React from 'react'

const useOutClick = (ref, callback) => {
  React.useEffect(() => {
    const handleOutClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleOutClick)

    return () => {
      document.removeEventListener('mousedown', handleOutClick)
    }
  }, [ref, callback])
}

export default useOutClick
