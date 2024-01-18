import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Loading from '../../Main/Loading';
import { useDispatch } from "react-redux";
import { adminlogin } from '../../Reduxstore/Slice/Adminslice';
 import { adminloginapi } from '../../Api/Adminapi';

function Login() {
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {values,errors,touched,getFieldProps,handleSubmit}=
  useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit
  })
  async function onSubmit(){
    try{
      setLoading(true)
      const res = await adminloginapi({...values})
      if (res?.status === 200){
        const {access, admin_id,adminname} = res.data
        console.log(access,'9999999922222222299999999')
        localStorage.setItem("adminToken",access)
        dispatch(
          adminlogin({
            token:access,
            admin:admin_id,
          })
        );
        toast.success(`Welcome ${res?.data?.adminname}`);
        navigate("/admin/overview");
        }

    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <>
     {loading ? (
      <div className="fixed inset-0 flex items-center justify-center">
      <div className="spinnerouter">
        <Loading/>
      </div>
    </div>
    ):(
    <div className="hero min-h-screen bg-black">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input 
          type="email"
           placeholder="email"
           name='email'
           id='email'
           {...getFieldProps('email')}
            className="input input-bordered" required />
             {errors.email && touched.email && (
           <p className="text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input 
          type="password" 
          placeholder="password"
          id='password'
          name='password'
          {...getFieldProps('password')}
           className="input input-bordered" required />
            {errors.password && touched.password && (
           <p className="text-red-600">{errors.password}</p>
          )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    )}
    </>
  );
}
export default Login