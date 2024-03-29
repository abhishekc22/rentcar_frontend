import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../Reduxstore/Slice/Userslice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Buyernav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("userToken");
    dispatch(userLogout());
    toast.success("logout successfully");
    navigate("/");
  };

  return (
    <div className="navbar bg-black border-b border-slate-80">
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
              <a>
                <Link
                  className="font-bold   text-white   text-2xl"
                  to="/buyer/buyerhome/"
                >
                  Home{" "}
                </Link>
              </a>
            </li>
            <li>
              <a>
                <Link className="font-bold" to="/buyer/profile/">
                  profile{" "}
                </Link>
              </a>
            </li>
            <li>
              <a>
                <Link
                  className="font-bold  text-white   text-2xl"
                  to="/buyer/buyerbooking/"
                >
                  my booking
                </Link>
              </a>
            </li>
            <li>
              <a className="font-bold ">contact</a>
            </li>
          </ul>
        </div>
        <a className=" font-bold  mx-4 text-2xl  text-white   ">car way</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>
              <Link
                className="font-bold   text-white   text-2xl"
                to="/buyer/buyerhome/"
              >
                Home{" "}
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link
                className="font-bold   text-white   text-2xl"
                to="/buyer/profile/"
              >
                profile{" "}
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link
                className="font-bold  text-white   text-2xl"
                to="/buyer/buyerbooking/"
              >
                my booking
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link
                className="font-bold  text-white   text-2xl"
                to="/buyer/wallet/"
              >
                Wallet{" "}
              </Link>
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex items-center">
          <Link to="/buyer/buyerchat">
            <img
              src="https://res.cloudinary.com/dhbzojgfp/image/upload/v1705763712/chat_nfibk6.png"
              alt="Chat Logo"
              className="w-10 h-11 mr-28 py-1 mt-2"
            />
            <h1 className="text-gray-400">chat</h1>
          </Link>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://res.cloudinary.com/dhbzojgfp/image/upload/v1705763713/logo_g26wxe.png"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li
              className=" px-12 cursor-pointer  text-black text-sm"
              onClick={handlelogout}
            >
              logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Buyernav;
