import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCar,
  faList,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import Partnernav from "./Common/Partnernav";
import { Link } from "react-router-dom";
import Partnersidebar from "./Common/Partnersidebar";
import Dashboard from "./Common/Dashboard";
import Partnerchart from "./Common/Partnerchart";

function Partnerservice() {
  return (
    <>
      <Partnernav />
      <div className="flex flex-row lg:flex-row ">
     
        <Partnersidebar />
        <div className="flex flex-col  px-14 w-8/12">
        
          <div className=" flex space-x-8 gap-10">
          <div className="w-10/12 h-[150px] bg-yellow-300 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
            <span className="font-bold text-1xl">Wallet</span>
            <span className="text-black font-bold  text-2xl">Amount: 80</span>
          </div>
          <div className="w-10/12 h-[150px] bg-red-600 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
            <span className="font-bold text-1xl">Sales</span>
            <span className="text-black font-bold  text-2xl">EXPENSES:7000 </span>
          </div>
        </div>
        <div className="py-10">
          
          <Partnerchart />
        </div>
          </div>
      </div>

    </>
  );
}
     

export default Partnerservice;
