import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { adminlogout } from "../../Reduxstore/Slice/Adminslice";


function  Navbar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handlelogout=()=>{
    localStorage.removeItem("adminToken")
    dispatch(adminlogout());
    toast.success("logout successfully")
    navigate("/admin/adminlogin")
  }

  return (
    <div className="navbar bg-blue-100 sticky top-0 z-50">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
           <h1 className=" text-3xl  font-black"> Admin side</h1>
        </ul>
      </div>
      <a className=" font-bold  mx-4 text-2xl">car way</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <h1 className=" text-3xl  font-black"> Admin side</h1>
      </ul>
    </div>
    <div className="navbar-end">
    <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS Navbar component" src="/src/assets/images/logo.png" />
      </div>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li  className=" text-blach px-12 cursor-pointer bg-black text-white" onClick={handlelogout} >logout</li>
      </ul> 
  </div>
    </div>
  </div> 
   )
}

export default Navbar;