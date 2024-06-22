import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { useAppData } from "../context/AppContext";
import { useState } from "react";
import userLogo from "../assets/user.png"
import cop661Logo from "../assets/200.webp"
import cop66Logo from "../assets/200_1.webp"
import cop34Logo from "../assets/200_33.webp"
const Result = () => {
    const { result, handleReset } = useAppData()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()


    return (
        <div className="bg-[#0B1120] h-screen text-white flex flex-col items-center pt-12">

            <img
                src={cop34Logo}
                alt="Click to upload"
                className="relative w-[30%] curp"

            />

            <h1 className="text-violet-700 my-4 text-xl">Result</h1>
            <div className="bg-white px-6 py-10 rounded-xl shadow-sky-800 flex flex-col items-center gap-10">

                {result?.img_url && <div className="w-36 shadow border-caret-cyan-600 border-2 rounded-full overflow-hidden p-1">
                    <img
                        src={result?.img_url || userLogo}
                        alt="user pic"
                        className="relative w-[100%] curp"

                    />
                </div>}
                <p className="text-red-500 rounded-full px-4">{
                Array.isArray(result?.message) ? result?.message[0] 
                : <span>
                    cop <span className="underline text-cyan-800 capitalize">{result?.cop}</span> captured the fugitive in <span  className="underline text-green-600 capitalize">{result?.fugitiveLocation}</span></span>}
                </p>
                {Array.isArray(result?.message) &&
                 !show &&
                  <p className="bg-cyan-700 rounded-xl p-2 text-sm" onClick={() => setShow(true)}>Show Fugitive Location</p>}
                {Array.isArray(result?.message) && show && <p className="text-black">{result?.message[1]}</p>}
              {  !Array.isArray(result?.message) &&<img
                    src={cop66Logo}
                    alt="Click to upload"
                    className="relative w-[60%] curp"

                />}
                <p className="bg-green-700 rounded-xl p-2" onClick={() => handleReset()}>Reset Result</p>
            </div>

        </div>
    );
};

export default Result;
