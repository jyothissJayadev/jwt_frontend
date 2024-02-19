import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import side from '../assets/side.png'
import { useFormik } from "formik";
import { toast, Toaster } from 'react-hot-toast';
import { loginUser } from '../api/api';
const Login = () => {
  const navigate =useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    onSubmit: async (values) => {

    
      try {
        let msg = await loginUser(values);
        toast.success(msg);
        navigate('/welcome')
      } catch (error) {
    
        // Display error message (e.g., using a toast li
        // brary)
        toast.error(error);
      }
    }
  })
    

  return (
    <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="login_container">
 
        <div className="login_wrapper">

        <div className="login_leftCon">
          <div className="imageContiner">
          <img src={side} alt="" />
          </div>
      
        </div>
   
        <div className="login_rightCon">
        <form  onSubmit={formik.handleSubmit}>
          <div className="login_page">
            <h1>Login</h1>
            <h2>Welcome to Kinss👋</h2>
            <div className="login_plate">
    <label htmlFor="email"><b>Email</b></label>
    <input 
       type="email"
    placeholder="Enter email"
     name="email"
     required
     {...formik.getFieldProps('email')}
     />

    <label htmlFor="psw"><b>Password</b></label>
    <input type="password"
     placeholder="Enter Password" 
     name="psw" required
     value={formik.values.password}
     {...formik.getFieldProps('password')}
     />
        
    <button type="submit" className='login_button'>Login</button>
    
    <br/>
    <br/>
    <Link className='register_link' to='/register'>Don't Have a Account?</Link>
  </div>
          
          </div>
          </form>
        </div>
        
        </div>
       
      </div>
    </div>
  )
}

export default Login
