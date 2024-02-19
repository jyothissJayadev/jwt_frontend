import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../api/api";

axios.defaults.baseURL  = 'https://jwt-verification-backend.onrender.com';


/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {
        const fetchData = async () => {
            try {
             
                setData(prev => ({ ...prev, isLoading: true}));

                const { email } = !query ? await getUsername() : '';
                
                const { data, status } = !query ? await axios.get(`/api/user/${email}`) : await axios.get(`/api/${query}`);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}

/*
-->in the profile page the complete set of code runs

--> where as in password the !query section wouldnt be running 
the password takes the username values from the zustand library

--> so the code run in such a way that 
1)starts with the username page goes to the password
2)there the zustand will be having the username value only if you go through username
if the username is not there then the server.error messgage is shown 
3)then it goes to the profile there the values comes from the backend if we goes directly
to the profile no backend data will be there to show hence errror page is not needed

-->this the the getuser function verifies the user using the tjwt_token
*/