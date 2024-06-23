import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppData } from '../context/AppContext';
import InputForm from './InputForm';

const Landing = () => {

    const { vehicles, handleSelection, cities, selections, checkResult } = useAppData()
    return (
        <div className="flex items-center justify-start flex-col gap-8 p-2">
            <ToastContainer />
            <h1 className=" flex items-start gap-2 bg-red-300 px-20 rounded-full -mb-2">
                <span className="animate-pulse -mt-1 text-xl">🚓</span>
                Fugitive Finder
                <span className="animate-pulse text-xl">🚨</span>
            </h1>


            <InputForm  cities={cities} onSelect={handleSelection} vehicles={vehicles} selections={selections} />
            <button className="bg-violet-900 p-2 rounded-xl text-white" onClick={checkResult}>Check Result</button>


        </div>
    );
};

export default Landing;
