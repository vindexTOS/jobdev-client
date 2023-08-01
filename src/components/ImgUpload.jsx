import React, { useEffect } from 'react'
import { UseMainContext } from '../../context'
import { TbPhotoX } from 'react-icons/tb'
import userDefault from '../assets/photos/userdefault.jpg'
import { MdCameraEnhance } from 'react-icons/md'
import { storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const ImgUpload = () => {
  const {
    image,
    setImage,
    htmlImg,
    setHtmlImg,
    imgUrl,
    setImgUrl,

    setImgLoading,

    setImgError,
  } = UseMainContext()
  const imgUpload = (e) => {
    if (!image) {
      let newImg = image
      let newHtmlImg = htmlImg
      if (e.target.files) {
        newImg = e.target.files[0]
        newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        setHtmlImg(newHtmlImg)
      }
    }
  }
  const imgUploadDrag = (e) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }
  const uploadFileToFirebaseStorage = async () => {
    if (image) {
      const storageRef = ref(storage, 'forum/' + image.name)
      setImgLoading(true)
      setImgError('')
      try {
        const snapshot = await uploadBytesResumable(storageRef, image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        setImgUrl(downloadURL)
        setImgLoading(false)
        console.log('succsess')

        removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    } else {
      setImgError('Please Select The File!')
      setTimeout(() => {
        setImgError('')
      }, 5000)
    }
  }
  useEffect(() => {
    if (image) {
      uploadFileToFirebaseStorage()
    }
  }, [image])
  const [hover, setHover] = React.useState(false)
  const handleDragOver = (e) => {
    e.preventDefault()
    setHover(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setHover(false)
  }
  const handleHoverOver = (e) => {
    e.preventDefault()
    setHover(true)
  }
  const handleHoverLeft = (e) => {
    e.preventDefault()
    setHover(false)
  }
  return (
    <div className="flex max_smm:w-[100%]  relative items-center justify-center max_md2:w-[40%] border-[2px] rounded-[4px] cursor-pointer">
      <label
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => imgUploadDrag(e)}
        onMouseOver={(e) => handleHoverOver(e)}
        onMouseLeave={(e) => handleHoverLeft(e)}
        className=" cursor-pointer "
        htmlFor="photo"
      >
        {hover && (
          <div className="w-[250px] h-[250px] absolute top-0 right-0 backdrop-blur-sm  bg-[#655c70]/40"></div>
        )}
        <img
          className={` w-[250px] h-[250px]  `}
          src={imgUrl ? imgUrl : userDefault}
        />
        <MdCameraEnhance
          className={`text-[4rem] absolute top-[30%] right-[38%]   ${
            hover ? `text-[#fd5564]/70` : `text-[#fd5564]/40`
          }`}
        />
        <input
          placeholder="Photo"
          onChange={(e) => imgUpload(e)}
          id="photo"
          className=" hidden block w-full text-sm  text-[#ec2b58]  boxshaddow  border border-gray-300 rounded-lg cursor-pointer   bg-[#2e2d2d] dark:text-gray-400 focus:outline-none bg-[#2e2d2d]   dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
        />
      </label>
      {htmlImg && (
        <TbPhotoX
          className="text-white text-[1.6rem] absolute right-80"
          onClick={() => removeImgFromHtml()}
        />
      )}
    </div>
  )
}

export default ImgUpload
