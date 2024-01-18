import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { partnerLogout } from "../../Reduxstore/Slice/Partnerslice";

function Partnernav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("partnertoken");
    dispatch(partnerLogout());
    toast.success("logout successfully");
    navigate("/");
  };
  return (
    <div className="navbar bg-black">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="font-bold  text-white   text-2xl">Home</a>
            </li>
            <li>
              <a>
                <Link className="  " to="/partner/dashboard/">
                  Service{" "}
                </Link>
              </a>
            </li>
            <li>
              <a>contact</a>
            </li>
            <li>
              <a>profile</a>
            </li>
          </ul>
        </div>
        <a className=" font-bold  text-white   mx-4 text-2xl">car way</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>
              <Link
                className="font-bold  text-white   text-2xl"
                to="/partner/home"
              >
                Home
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link
                className="font-bold  text-white   text-2xl"
                to="/partner/service/"
              >
                Service{" "}
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link
                className="font-bold  text-white   text-2xl"
                to="/partner/profile/"
              >
                profile{" "}
              </Link>
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div>
          <Link  to="/partner/partnerchat/">
            <img
              src="/src/assets/images/chat.png"
              alt="Chat Logo"
              className="w-10 h-11 mr-28 py-1 mt-2"
            />
            <h1 className="text-gray-400">chat</h1>
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={handlelogout}
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="/src/assets/images/logo.png"
                />
              </div>
            </button>
          </label>
        </div>
      </div>
    </div>
  );
}
export default Partnernav;
