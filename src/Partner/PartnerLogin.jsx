import React from 'react'
import Header from '../Main/Header'
import { Link ,useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { partnerloginapi } from '../Api/Partnerapi';
import { useDispatch } from "react-redux";
import { useState } from "react";
import Loading from '../Main/Loading';
import { partnerloginSchema } from './Validation/Login';
import "react-toastify/dist/ReactToastify.css";
import { partnerLogin } from '../Reduxstore/Slice/Partnerslice';


function PartnerLogin() {
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const { values, errors, touched,getFieldProps ,handleSubmit } =
  useFormik({
    initialValues:{
      email:"",
      password:"",

    },
    validationSchema:partnerloginSchema,
    onSubmit,

  });
  async function onSubmit(){
    try{
      console.log('hloooo',{...values});
      setLoading(true)
      const res = await partnerloginapi({...values})
      console.log(res,'62626');
      if (res?.status==200){
        const {access,partnername,patrner_id}=res.data
        
        localStorage.setItem("partnertoken",access);
        dispatch(
          partnerLogin({
            token:access,
            partner:patrner_id,
            partnername:partnername,

          })
        );
        toast.success((`Welcome ${res?.data?.partnername}`),{ theme: "dark" });
        navigate("/partner/home");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error, "response in error");
    }
  }
  return (
    <>
    <Header/> 
    {loading ? (
 <div className="fixed inset-0 flex items-center justify-center">
 <div className="spinnerouter">
   <Loading />
 </div>
</div>
) :(   
    <div className="hero min-h-screen " style={{ backgroundImage: "url(https://res.cloudinary.com/dhbzojgfp/image/upload/v1705775295/car46_gfyudr.jpg)" }}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-silver">
      <form className="card-body"onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="text-white">Email</span>
          </label>
          <input
           type="email"
            placeholder="email"
            name='email'
            id='email'
            {...getFieldProps("email")}
            className="input input-bordered " required />
             {errors.email && touched.email && (
           <p className="text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="text-white ">Password</span>
          </label>
          <input 
          type="password"
           placeholder="password" 
           name='password'
           id='password'
           {...getFieldProps("password")}
           className="input input-bordered" required />
          {errors.password && touched.password && (
           <p className="text-red-600">{errors.password}</p>
          )}
          <label className="label">
            <a href="#" className="text-white link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-white text-black" type="submit" >Login</button>
        </div>
        <label className="label">
            <a> <Link className="text-white link link-hover" to="/partner/signup">signup</Link></a>
          </label>
      </form>
    </div>
  </div>
</div>
)}
    </>
  )
}

export default PartnerLogin