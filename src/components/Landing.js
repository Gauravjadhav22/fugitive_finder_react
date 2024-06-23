import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputForm from './InputForm';

const Landing = () => {

    return (
        <div className="flex items-center justify-start flex-col gap-8 p-2">
            <ToastContainer />
            <h1 className=" flex items-start gap-2 bg-red-300 px-20 rounded-full -mb-2">
                <span className="animate-pulse -mt-1 text-xl">🚓</span>
                Fugitive Finder
                <span className="animate-pulse text-xl">🚨</span>
            </h1>


            <InputForm />



        </div>
    );
};

export default Landing;
