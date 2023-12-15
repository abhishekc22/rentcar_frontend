import React from 'react'
import Header from '../Main/Header'
import { Link ,useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { userloginapi } from '../Api/Userapi';
import { useDispatch } from "react-redux";
import { userlogin } from '../Reduxstore/slice/Userslice';
import { useState } from "react";
import Loading from '../Main/Loading';
import { loginSchema } from './Validation/Userlogin';
import "react-toastify/dist/ReactToastify.css";



function Login() {
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues:{
      email:"",
      password:"",

    },
    validationSchema:loginSchema,
    onSubmit

  });
  async function onSubmit(){
    try{
      
      setLoading(true)
      const res = await userloginapi(values)
      if (res?.status==200){
        const { access, buyer_id } = res.data;
        localStorage.setItem("userToken", access);
        dispatch(
          userlogin({
            token:access,
            user:buyer_id,
          })
        );
        toast.success(`Welcome ${res?.data?.buyername}`);
        navigate("/buyer/buyerhome");
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
    <div className="hero min-h-screen " style={{ backgroundImage: "url('/src/assets/images/login2.png')" }}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-silver">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="text-white">Email</span>
          </label>
          <input
           type="email"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input input-bordered " required />
            {errors.email && touched.email && (
              <p className=" text-sm text-red-600">{errors.email}</p>
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
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input input-bordered" required />
             {errors.password && touched.password && (
              <p className=" text-sm text-red-600">{errors.password}</p>
            )}
          <label className="label">
            <a href="#" className="text-white link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-white text-black" type="submit" >Login</button>
        </div>
        <label className="label">
            <a> <Link className="text-white link link-hover" to="/buyer/signup">signup</Link></a>
          </label>
      </form>
    </div>
  </div>
</div>
)}
</>   
  )
}
export default Login