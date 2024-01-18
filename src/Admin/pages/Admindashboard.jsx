import React from "react";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import Adminchart from "./Adminchart";

function Admindashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Adminsidebar />
        <div className="flex flex-col ml-2  py-1 px-5 w-9/12">
          <div className=" flex space-x-26 gap-10">
            <div className="w-6/12 h-[150px] bg-yellow-300 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
              <span className="font-bold text-1xl">Wallet</span>
              <span className="text-black font-bold  text-2xl">Amount: 80</span>
            </div>
            <div className="w-6/12 h-[150px] bg-red-600 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
              <span className="font-bold text-1xl">Return Amount</span>
              <span className="text-black font-bold  text-2xl">
                AMOUNT:7000{" "}
              </span>
            </div>
            <div className="w-6/12 h-[150px] bg-green-300 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
              <span className="font-bold text-1xl">Wallet</span>
              <span className="text-black font-bold  text-2xl">Amount: 80</span>
            </div>
          </div>
          <Adminchart/>
        </div>
      </div>
    </>
  );
}

export default Admindashboard;
