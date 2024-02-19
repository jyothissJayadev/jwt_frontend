import axios from 'axios';
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL  = 'https://jwt-verification-backend.onrender.com';
export async function registerUser(credentials) {
  console.log(credentials)
  const {name,email,password}=credentials;
    try {
      const response = await axios.post(`/api/register`, JSON.stringify({name,email,password}), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Check if the response indicates success or failure
      if (response.data.success) {
        // Registration was successful
        return Promise.resolve(response.data.message);
      } else {
        // Registration failed, reject with the error message
        return Promise.reject(response.data.error);
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      if(error.message==="Network Error"){
        return Promise.reject(error.message);
      }
  else{
    console.log("else")
    return Promise.reject(error.response.data.error);
  }
    }
  }


  

//--->HOW TO TAKE VALUES/MESSAGE FROM  THE BACKEND AND SHOW IT IN FRONTEND
  // the response in the try return the values from the bakend 
  //the error in the catch will return from the backend

  export async function loginUser(credentials) {
    try {
      const response = await axios.post(`/api/login`, JSON.stringify(credentials), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      // Check if the response indicates success or failure
      if (response.data.success) {
        // Registration was successful
        const token = response.data.token;

        // Save the token in localStorage
        localStorage.setItem('token', token);

        return Promise.resolve(response.data.msg);
        
      } else {
        // Registration failed, reject with the error message
    
        return Promise.reject(response.data.error);
      }
    } catch (error) {
      console.error(error);
      // Handle unexpected errors (e.g., network issues)
      if(error.message==="Network Error"){
      return Promise.reject(error.message);
    }
else{
  console.log("else")
  return Promise.reject(error.response.data.error);
}
    
    }
  }

  export async function getUsername(){
    const token = localStorage.getItem('token')
    console.log("hello")
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

export function clearToken() {
  localStorage.removeItem('token');
}