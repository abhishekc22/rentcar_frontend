import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminlogout } from "../../Reduxstore/Slice/Adminslice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(adminlogout());
    toast.success("Logout successfully");
    navigate("/admin/adminlogin");
  };

  return (
    <div className="navbar bg-blue-100 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            {/* Your icon here */}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <h1 className="text-3xl font-black">Admin side</h1>
          </ul>
        </div>
        <a className="font-bold mx-4 text-2xl">car way</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <h1 className="text-3xl font-black">Admin side</h1>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="/src/assets/images/logo.png"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li
              className="text-black px-12 cursor-pointer bg-black"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
