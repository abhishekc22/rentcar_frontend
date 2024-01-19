import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { googleapi } from '../Api/Userapi';
import { useDispatch } from 'react-redux';
import { userlogin } from "../Reduxstore/Slice/Userslice";


function Google() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  
  const  handleLogin= async (response)=>{
    const user = jwtDecode(response?.credential)
    try{
      const res=await googleapi({'email':user.email});
      
        const { access, buyer_id } = res.data;
        localStorage.setItem("userToken", access);
        console.log(access, buyer_id)
        dispatch(
          userlogin({
            token: access,
            user: buyer_id,
          })
        );
        toast.success(`Welcome ${res?.data?.buyername}`);
        navigate("/buyer/buyerhome");

    }catch(error){
      toast.error('server error');
    }
  }


 

  
  return (
    <GoogleLogin 
      onSuccess={handleLogin}
      onError={(error) => {
        console.error('Login Failed:', error);
      }}
    />
  );
}

export default Google;

