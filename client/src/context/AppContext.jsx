import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const AppContent = createContext();

export const AppContentProvider = (props) =>{

    const backendUrl = import.meta.env.DEV ? '' : import.meta.env.VITE_BACKEND_URL;
    const[isLoggedin, setIsLoggedin] = useState(false);
    const[userData, setUserData] = useState(false);

   const getAuthState = async()=>{
    try{

        const {data} = await axios.get(backendUrl + '/api/auth/is-auth');
        if(data.success){
            setIsLoggedin(true)
            await getUserData()
        }
    }catch(error){
        toast.error(error.message);
    }
   }
   
    const getUserData = async() => {
        try{
            const{data} = await axios.get(backendUrl+'/api/user/data');
            data.success ? setUserData(data.userData) : toast.error(data.message);
        }catch(error){
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getAuthState()
    },[])

    const value = {
        backendUrl, 
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData

    }
    return (
        <AppContent.Provider value={value} >
            {props.children}
        </AppContent.Provider>
    )
}