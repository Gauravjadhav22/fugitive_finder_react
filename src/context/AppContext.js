import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selections, setSelections] = useState([]);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const citiesData = await axios.get('http://localhost:5005/cities');
                setCities(citiesData?.data);
                const vehiclesData = await axios.get('http://localhost:5005/vehicles');
                setVehicles(vehiclesData?.data);
                const selectionsData = await axios.get('http://localhost:5005/selections');
                setSelections(selectionsData?.data)
            } catch (error) {
                toast.error(error?.response?.data?.error);
            }
        };

        getData();
    }, []);

    const handleSelection = async (cop, city, vehicle, img_url) => {
        try {
            const resp = await axios.post('http://localhost:5005/selections', { cop, city, vehicle, img_url });
            if (resp?.status === 200) {
                toast.success(`Cop ${cop} is on way to catch the fugitive`);
                setSelections([...selections, { cop, city, vehicle }]);
            } else {
                toast.error(resp?.data?.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };

    const checkResult = async () => {
        if (!selections.length) {
            toast.error('Please add at least one cop');
            return;
        }
        try {
            const resp = await axios.get('http://localhost:5005/result');
            setResult(resp?.data);
            navigate('/result');
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };

    const handleReset = async () => {
        try {
            const resp = await axios.get("http://localhost:5005/reset")
            const selectionsResp = await axios.get("http://localhost:5005/selections")
            setSelections(selectionsResp?.data)
            toast.success(resp.data?.message)
            navigate("/")
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    }
    return (
        <AppContext.Provider value={{ result, setResult, cities, vehicles, selections, setCities, setVehicles, setSelections, handleSelection, checkResult, handleReset }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = () => {
    return useContext(AppContext);
};

export default AppContext;
