import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import loadingLogo from "../assets/loading.png"
import cop3Logo from "../assets/100.webp"
import userLogo from "../assets/user.png"
import axios from 'axios';
import { PRESET } from '../environmentVariables';
import { useAppData } from '../context/AppContext';
import Cops from './Cops';
const InputForm = ({ }) => {
    const { vehicles, selections, cities, checkResult, handleSelection } = useAppData()
    const [cop, setCop] = useState('');
    const [city, setCity] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleSelect = () => {
        if (city) {
            if (!vehicle) {
                toast('Select a vehicle.');
                return
            }
            if (!cop) {
                toast('Add a cop.');
                return
            }
            handleSelection(cop, city, vehicle, imageUrl);
            setCop('');
            setCity('')
            setVehicle('');
            setImage(null)
            setImageUrl(null)
        } else {
            toast('Select a city first.');
        }

    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', PRESET);
        try {
            setLoading(true)

            const response = await axios.post('https://api.cloudinary.com/v1_1/dwmm1r1ph/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImageUrl(response.data.secure_url);
            toast.success('Image uploaded successfully.');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image.');
        }
        finally {
            setLoading(false)

        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center shadow shadow-amber-600 p-12 gap-6 bg-white rounded-md">
                <img
                    src={cop3Logo}
                    alt="Click to upload"
                    className="relative w-[80%] curp -mt-8"

                />

                {loading && <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center z-50"><img
                    src={loadingLogo}
                    alt="loading..."
                    className="relative w-[5%] curp"
                /></div>}
                <h2 className="bg-amber-200 px-3 rounded">{selections?.length >= 3 ? <>Only Three Cops Allowed</> : <>{`Cop ${selections?.length + 1} Details`}</>}</h2>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-36 mt-4 shadow border-caret-cyan-600 border-2 rounded-full overflow-hidden p-1">
                        <img
                            src={imageUrl ? imageUrl : userLogo}
                            alt="Click to upload"
                            className="relative w-[100%] curp"
                            onClick={() => fileInputRef.current.click()}
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    {/* <button className="bg-amber-300 p-1 rounded-md mt-1" onClick={handleImageUpload}>Upload Image</button> */}


                </div>
                <div className="p-2 flex flex-col justify-center gap-6">
                    <div>

                        <input
                            type="text"
                            placeholder="Cop Name"
                            value={cop}
                            onChange={(e) => setCop(e.target.value)}
                            className="p-1 capitalize"
                            required
                        />
                    </div>
                    <div>
                        <select className="w-full p-1 border-none rounded-md" required value={city} onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select City</option>
                            {cities?.map((city) => (
                                <option className="flex justify-between items-center mt-2" key={city.name} value={city.name}>
                                    <span>{city.name}</span>
                                    <span className="ml-4 text-gray-500">&nbsp;--{city.distance}km</span>
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>  <select className="w-full p-1 border-none rounded-md" required value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                        <option value="">Select Vehicle</option>
                        {vehicles?.map((vehicle) => (
                            <option className="flex justify-between items-center mt-2" key={vehicle.kind} value={vehicle.kind}>
                                <span> {vehicle.kind}</span>
                                <span className="mr-4 text-gray-500">&nbsp;--{vehicle.range}km</span>
                            </option>
                        ))}
                    </select></div>


                </div>
                <button className="w-fit bg-green-600 p-1.5 px-4 rounded-xl text-white" onClick={handleSelect}>Submit</button>

            </div>
            <button className="bg-violet-900 p-2 rounded-xl text-white" onClick={checkResult}>Check Result</button>
          <Cops selections={selections}/>
        </>
    );
};

export default InputForm;
