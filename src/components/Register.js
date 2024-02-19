import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import side from '../assets/side.png'
import { useFormik } from "formik";
import { toast, Toaster } from 'react-hot-toast';
import {  registerUser } from '../api/api';
const Register = () => {
  const navigate =useNavigate();

  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async (values) => {

      if (values.password !== values.confirmPassword) {
        toast.error("Password and Confirm Password must match");
        return;
      }

      const { confirmPassword, ...value } = values;
      try {
        let msg = await registerUser(value);
        console.log(msg);
        // Display success message (e.g., using a toast library)
        toast.success(msg);
        alert("Registered Successfully")
        navigate('/')

      } catch (error) {
        console.log(error);
        // Display error message (e.g., using a toast li
        // brary)
        toast.error(error);
      }
    
    }
  });


  return (
    <div>
      <div className="login_container">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="login_wrapper">

        <div className="login_leftCon">
          <div className="imageContiner">
          <img src={side} alt="" />
          </div>
      
        </div>
   
        <div className="login_rightCon">
        <form  onSubmit={formik.handleSubmit}>
          <div className="login_page">
            <h1>Register</h1>
            <h2>Welcome to Kinss👋</h2>
            <div className="login_plate">

            <label htmlFor="name"><b>Name</b></label>
    <input 
       type="name"
    placeholder="Enter name"
     name="name"
     required
     {...formik.getFieldProps('name')}
     />

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

<label htmlFor="confirmPassword"><b>Confirm Password</b></label>
<input
  type="password"
  placeholder="Confirm Password"
  name="confirmPassword"
  required
  value={formik.values.confirmPassword}
  {...formik.getFieldProps('confirmPassword')}
/>
        
    <button type="submit" className='login_button'>Register</button>
   
    <br/>
    <br/>
    <Link className='register_link' to='/'>Already Have a Account?</Link>
  </div>
          
          </div>
          </form>
        </div>
        
        </div>
       
      </div>
    </div>
  )
}

export default Register
