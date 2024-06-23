import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppContext = createContext();

const BASE_URL = "https://fugitive-finder-nodejs.onrender.com"

export const AppProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selections, setSelections] = useState([]);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const citiesData = await axios.get(`${BASE_URL}/cities`);
                setCities(citiesData?.data);
                const vehiclesData = await axios.get(`${BASE_URL}/vehicles`);
                setVehicles(vehiclesData?.data);
                const selectionsData = await axios.get(`${BASE_URL}/selections`);
                setSelections(selectionsData?.data)
                // checkResult()
            } catch (error) {
                toast.error(error?.response?.data?.error);
            }
        };

        getData();
    }, []);

    const handleSelection = async (cop, city, vehicle, img_url) => {
        try {
            const resp = await axios.post(`${BASE_URL}/selections`, { cop, city, vehicle, img_url });
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
            const resp = await axios.get(`${BASE_URL}/result`);
            const selectionsData = await axios.get(`${BASE_URL}/selections`);
            setResult(resp?.data);
            setSelections(selectionsData?.data);
            navigate('/result');
        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    };

    const handleReset = async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/reset`)
            const selectionsResp = await axios.get(`${BASE_URL}/selections`)
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
