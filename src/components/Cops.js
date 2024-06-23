import React from 'react'
import userLogo from "../assets/user.png"

const Cops = ({selections}) => {
  return (
        <div className="flex flex-wrap gap-5 items-center justify-center items-center ">
                {selections?.map((item) => {
                    return (<div className="bg-gray-400 p-5 shadow-lg shadow-sky-800 flex flex-col items-center gap-4 text-black">

                        <div className="w-36 shadow bg-gray-600 rounded p-1 border-caret-cyan-600 overflow-hidden">
                            <img
                                src={item?.image || userLogo}
                                alt="user pic"
                                className="relative w-36 h-36"

                            />

                        </div>
                        <p className="bg-amber-100 px-3 rounded">Name: {item?.cop}</p>
                        <p className="bg-amber-100 px-3 rounded">City: {item?.city}</p>
                        <p className="bg-amber-100 px-3 rounded">Vehicle: {item?.vehicle}</p>


                    </div>)
                })}
            </div>
  )
}

export default Cops
