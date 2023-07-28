import React from 'react'
import { UseMainContext } from '../../context'
import { BiSolidSkipNextCircle, BiPauseCircle } from 'react-icons/bi'

const NextShowButton = ({ btnWrapperDrop, setBtnWrapperDrop, ShowBtnIcon }) => {
  const { zoomIn } = UseMainContext()
  return (
    <div>
      {zoomIn && (
        <>
          {btnWrapperDrop ? (
            <BiSolidSkipNextCircle
              title="Find next dev"
              onClick={() => setBtnWrapperDrop(!btnWrapperDrop)}
              className={ShowBtnIcon}
            />
          ) : (
            <BiPauseCircle
              onClick={() => setBtnWrapperDrop(!btnWrapperDrop)}
              className={ShowBtnIcon}
            />
          )}
        </>
      )}
    </div>
  )
}

export default NextShowButton
