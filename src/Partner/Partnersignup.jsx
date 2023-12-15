import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import  { useState } from "react";
import Loading from '../Main/Loading';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupSchema } from './Validation/Signup';
import { partnerSignupapi } from '../Api/Partnerapi';

function Partnersignup() {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const{values,errors,touched,getFieldProps,handleSubmit}=
  useFormik({
    initialValues:{
      username:"",
      email:"",
      phone_number:"",
      password:"",
      Confirmpassword:"",
    },
    validationSchema:signupSchema,

    onSubmit,
  });

  async function onSubmit(){
  
    try{
      console.log("onsublmitinte ullil",{...values});
      setLoading(true);
      const res = await partnerSignupapi({...values});
      if (res?.status === 201) {
        console.log("sucess")
        toast.success((`Welcome ${res?.data?.partnername}`),{ theme: "dark" });
        navigate("/partner/login");
      }
      setLoading(false);
    }catch(error){
      toast.error("server error", { theme: "dark" });
      console.log(error, "response in error");
      setLoading(false);
    }

  }

  return (
    <>
    {loading ? (
 <div className="fixed inset-0 flex items-center justify-center">
 <div className="spinnerouter">
   <Loading />
 </div>
</div>
) :( 
     <div className="hero min-h-screen" style={{ backgroundImage: "url('/src/assets/images/partnerlogin2.jpg')" }}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-white">Signup now!</h1>
      <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl" style={{ backgroundImage: "url('/src/assets/images/login7.jpeg')" }}>
      <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Username</span>
          </label>
          <input
           type="text" 
           placeholder="Username"
           id="username"
           name='username'
           {...getFieldProps("username")}
            className="input input-bordered" required />
            {errors.username && touched.username && (
           <p className="text-red-600">{errors.username}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text  text-white">Email</span>
          </label>
          <input
           type="email" 
           placeholder="email"
           name='email'
           id="email"
           {...getFieldProps("email")}
            className="input input-bordered" required />
            {errors.email && touched.email && (
           <p className="text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">phone number</span>
          </label>
          <input type="phone_number"
           placeholder="phone_number"
           name='phone_number'
           id="phone_number"
           {...getFieldProps("phone_number")}
            className="input input-bordered" required />
            {errors.phone_number && touched.phone_number && (
           <p className="text-red-600">{errors.phone_number}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
           type="password" 
           placeholder="password"
           name='password'
           id="password"
           {...getFieldProps("password")}
            className="input input-bordered" required />
            {errors.password && touched.password && (
           <p className="text-red-600">{errors.password}</p>
          )}
          <label className="label">
            <span className="label-text  text-white "> confirm Password</span>
          </label>
          <input
           type="password" 
           name='Confirmpassword'
           placeholder="Confirmpassword"
           id="Confirmpassword"
           {...getFieldProps("Confirmpassword")}
            className="input input-bordered" required />
            {errors.Confirmpassword && touched.Confirmpassword && (
           <p className="text-red-600">{errors.Confirmpassword}</p>
          )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover text-white ">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
        <button type="submit" className="btn btn-danger" to="/partner/home">Signup</button>
        </div>
      </form>
    </div>
  </div>
</div>
)}
    </>
  )
}

export default Partnersignup