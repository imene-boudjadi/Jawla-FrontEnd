import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { loadState, saveState } from "./localStorage";

const initialState = {
    isAuth : false,
    admin : null
}

const context = createContext();

const AuthProvider = ({children}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authState, setAuthState] = useState(null);

    useEffect(()=> {
        const savedState = loadState();
        if (savedState) {
            setAuthState(savedState)
        }
    },[]);
    useEffect(()=>{
        saveState(authState);
        console.log("usefffff", authState)
    },[authState]);

    

    const login = (loginFormData) => {
        //here       
        
        axios.post('http://localhost:4000/admin/login', loginFormData, {
        headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
                // console.log(response)
                 setIsLoading(false);
                 //setError(null);
                // setIsAuth(true);
                
                // setAdmin(response.data);
                setAuthState({
                    isAuth : true,
                    admin : response.data
                });
                // Redirigez l'utilisateur vers la nouvelle page après la réussite de la requête
                router.push('/employe/accueil');  
          }).catch ((error)=> {
                setError(error.response.data);
                setIsLoading(false)
                //console.error(error.response.data);
          }
          )
    }

    const logout = () => {
        //here
        router.push('/employe');
        // setIsAuth(false);
        // setAdmin(null);
        setAuthState(initialState);
        
    }

    return (
        <context.Provider value={{authState,isLoading,error,login,logout}}>
            {children}
        </context.Provider>
    )
}



export {context, AuthProvider};