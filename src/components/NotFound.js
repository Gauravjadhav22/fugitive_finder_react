import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="bg-[#0B1120] h-screen flex flex-col items-center text-white pt-12 gap-10 text-xl">
          <span >
               PAge NOt FOund !...
              
              </span> 

            <NavLink className="bg-blue-700 rounded-xl p-2" to="/">Go Home &lt;-- </NavLink>
        </div>
    )
}

export default NotFound
