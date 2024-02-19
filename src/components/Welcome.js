import React from 'react'
import useFetch from '../hooks/fetch.hook'
import { useState,useEffect } from 'react';
import Profile from '../assets/profile.jpg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../api/api';
const Welcome = () => {
  const navigate=useNavigate()

  const [{ isLoading, apiData, serverError }] = useFetch();
  const [userData, setUserData] = useState({ name: '', email: '', _id: '' });

/* -->>THE API DATA TAKES TIME TO RENDER SO ALWAYS FEEED A NULL VALUE TO THE ELEMENTS 
OTHERWISE THE ERROR WILL BE SHOW AS SOON AS WE OPEN THE PAGE */
  useEffect(() => {
    if (!isLoading && apiData) {
      // Update the state when data is available
      setUserData(apiData);
    }
  }, [isLoading, apiData]);

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

const backButton=()=>{
clearToken()
  navigate('/')
}

  return (


    <>
    <div className="page_container">
      <div className="page_wrapper">
        <button  onClick={backButton} className="back_page">
          <ArrowBackIcon/>
        </button >
           <div className="page_img">
          <img src={Profile} alt="" />
        </div>
        <div className="page_content">
        <label htmlFor="name">Name: </label>
        <span> {userData.name}</span>
        </div>
        <div className="page_content">
        <label htmlFor="name">Email: </label>
        <span> {userData.email}</span>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Welcome
