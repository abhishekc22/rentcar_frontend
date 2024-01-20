import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar bg-white 700 border-b  border-slate-700 ">
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
                 <li>
              <a className="font-bold  text-slate-700   text-2xl">Home</a>
            </li>
            <li>
              <a className="font-bold  text-white   ">about</a>
            </li>
            <li>
              <a  className="font-bold  text-white   ">contact</a>
            </li>
          </ul>
        </div>
        <a className=" font-bold  mx-4 text-2xl  text-black  ">car way</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
          <a  className="font-bold  text-black text-2xl">Home</a>
          </li>
          <li>
          <a className="font-bold  text-black   text-2xl" >about </a>
          </li>
  
          <li>
            <a className="font-bold  text-black   text-2xl">contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
      <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://res.cloudinary.com/dhbzojgfp/image/upload/v1705763713/logo_g26wxe.png" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link  className="bg-black px-12 text-white" to="/buyer/login">user login</Link></li>
        <br>
        </br>
        <li><Link className="bg-black px-12 text-white" to="/partner/login">partner login</Link></li>
      </ul>
    </div>
      </div>
    </div>
  );
};

export default Header;
