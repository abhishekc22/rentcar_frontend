import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import  { useState } from "react";
import { signupSchema } from './Validation/Usersignupvalidation';
import Loading from '../Main/Loading';
import { userSignupApi } from '../Api/Userapi';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const { values,errors,touched,handleBlur,handleChange,handleSubmit}=
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
      console.log('klooooo');
      setLoading(true);
      const res = await userSignupApi(values);
      if (res?.status === 201) {
        toast.success((`Welcome ${res?.data?.buyernames}`),{ theme: "dark" });
        navigate("/buyer/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("server error", { theme: "dark" });
      console.log(error, "response in error");
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
<div className="hero min-h-screen" style={{ backgroundImage: "url('/src/assets/images/login5.jpeg')" }}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Signup now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl" style={{ backgroundImage: "url('/src/assets/images/login7.jpeg')" }}>
      <form  className="card-body" onSubmit={handleSubmit}>
      <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Username</span>
          </label>
          <input 
          type="text" 
          name="username"
          placeholder="Username" 
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}

          className="input input-bordered"
           required />
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
           name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
             className="input input-bordered"  required />
        </div>
        {errors.email && touched.email && (
          <p className="text-red-600">{errors.email}</p>
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">phone number</span>
          </label>
          <input
           type="text" 
           name='phone_number'
           placeholder="phone_number "
           value={values.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
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
          name="password"
           placeholder="password"
           value={values?.password}
           onChange={handleChange}
           onBlur={handleBlur}
           className="input input-bordered"  required />

            {errors.password && touched.password && (
             <p className="text-red-600">{errors.password}</p>
            )}
          <label className="label">
            <span className="label-text  text-white "> confirm Password</span>
          </label>
          <input
           type="password"
           name="Confirmpassword"
           placeholder="confirm password" 
           value={values?.Confirmpassword}
            onChange={handleChange}
            onBlur={handleBlur}
           className="input input-bordered"  required />
           {errors.Confirmpassword && touched.Confirmpassword && (
            <p className="text-red-600">{errors.Confirmpassword}</p>
            )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover text-white ">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit"className="btn btn-danger" >Signup</button>
        </div>
      </form>
    </div>
  </div>
</div>
)}
    </>
  );
}

export default Signup