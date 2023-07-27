import React from 'react'

export default function FindDevSkeleton() {
  const style = {
    mainDiv: ` animate-pulse	 wborder-solid-2 h-[100%] border-black flex flex-col gap-10  `,
    infoWrapper: `  relative  w-[100%] justify-around flex  p-5 rounded-[5px]   solid border-black   `,
    header: ` flex  h-[2.5rem] items-center justify-center gap-10 text-center bg-gray-200 p-1 rounded-[5px] shadow-md   text-3xl font-medium font-mono text-gray-500`,
    info: `text-gray-600`,
    imgWrapper: `flex justify-around gap-10`,
    img: `w-[300px] h-[300px] bg-gray-200 animate-pulse	`,
    nameHeader: `text-[2rem] bg-gray-200 h-[2.5rem] rounded-[12px] w-[12rem] `,
    linksDiv: `flex flex-col items-start px-10 justify-around bg-white w-[340px] rounded-[9px] shadow-md`,
    icon: `   `,
    iconWrapper: `flex  items-center justify-center text-[1.2rem] gap-2`,
    skillsDiv: `pt-10`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.infoWrapper}>
        <h1 className={`${style.header}  w-[90%] absolute top-[-3rem] `}>
          <div className={style.icon}></div>
        </h1>

        <div className={style.imgWrapper}>
          <div className={style.img}></div>
          <div className="flex flex-col gap-2">
            <h1 className={style.nameHeader}></h1>
            <div className="flex  h-[1.7rem] w-[9rem] items-center justify-center gap-10 text-center bg-gray-200 p-1 rounded-[5px] shadow-md   text-3xl font-medium font-mono text-gray-500 "></div>
            <div className="flex  h-[1.8rem] w-[5rem] items-center justify-center gap-10 text-center bg-gray-200 p-1 rounded-[5px] shadow-md   text-3xl font-medium font-mono text-gray-500"></div>
            <div className={style.skillsDiv}>
              <p className="text-[1.5rem] text-gray-900"> </p>
              <div className="flex flex-wrap gap-1 w-[230px]">
                {'flex flex-wrap gap-1 w-[230px] flex text-[1.2rem] flex text-gray-900 flex'
                  .split(' ')
                  .map((val, index) => {
                    return (
                      <div
                        key={String(index)}
                        className=" shadow-md text-gray-100 p-1 text-[15px] rounded-[9px] bg-gray-100"
                      >
                        {val}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className={style.linksDiv}>
          <div className={style.iconWrapper}>
            <div className={style.icon}></div>
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}></div>
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}></div>
            <p className="text-gray-500"> </p>
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}></div>
            <p className="text-gray-500"> </p>{' '}
          </div>
          <div className={style.iconWrapper}>
            <div className={style.icon}></div>
            <p className="text-gray-500"> </p>{' '}
          </div>
        </div>
      </div>
      <section className="relative">
        <div className={`${style.header} cursor-pointer`}>
          <div className={style.icon}></div>
          <h1> </h1>
          <div className={style.btnWrapper}></div>
        </div>

        <div className={` relative  ${'overflow-hidden h-[130px]     pb-20'} `}>
          <div className={` ${'overLay'}`}></div>
          <p
            className={`  ${'hidden'}   z-50 cursor-pointer text-[1.5rem] absolute top-[4rem] text-center w-[100%] text-red-400 font-bold `}
          ></p>
        </div>
      </section>
      <section>
        <div className={`${style.header} cursor-pointer`}>
          <div className={style.icon}></div>

          <h1> </h1>
          <div className={style.btnWrapper}></div>
        </div>
        <div>
          <p
            className={`  ${'hidden'}   z-50 cursor-pointer text-[1.5rem] absolute top-[4rem] text-center w-[100%] text-red-400 font-bold `}
          ></p>
        </div>
      </section>
    </div>
  )
}
