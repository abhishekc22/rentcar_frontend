import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { checkoutapi } from "../Api/Userapi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { boookingapi } from "../Api/Userapi";
import axios from "axios";
import Buyernav from "./Common/Buyernav";


function Checkout() {
  const location = useLocation();
  const[book,setBook]=useState(null)
  const { state } = location;
  const {  buyer_name,ownername,owaner_phonenumber,car_location, pickupdate, returndate, total_amount, carimage, document } = state || {};

  const handlePayment= async()=>{
    try{
      const res= await checkoutapi(pickupdate,returndate,total_amount,car_location,buyer_name);
      console.log(res.data.url,'-----------------')
      if(res.data.url){
        window.location.href = res.data.url
        console.log('hihihihihi');
      }else{
        toast.error("booking cancelled");
      }
    }catch(error){
      toast.error("date is  alredy booked");
    }

  }

  return (
    <>
    <Buyernav/>
    <div className=" min-h-screen bg-black">
    <div className=" h-96 flex items-center justify-center">
      <div className="text-white flex flex-row">
        
        <img
          src={carimage}
          alt="Car Image"
          className="h-full w-82 max-w-md mr-36  mt-10 border-white border-2"
        />
       
        <div>
        <h1 className=" text-2xl">car document</h1>
        <img
          src={carimage}
          alt="Document"
          className="h-full w-82 max-w-md  border-white border-2"
        />
         </div>
      
      </div>
    </div>

    <div className="h-92 p-4 rounded-md shadow-md">
      <h2 className="text-4xl font-bold mb-6 text-white">Check out page</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 md:col-span-1">
          <p className="text-lg text-gray-600 mb-2">Owner Name: {ownername}</p>
          <p className="text-lg text-gray-600 mb-2">Phone Number: after the  payment get  the number</p>
          <p className="text-lg text-gray-600 mb-2">Location: {car_location}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-lg text-gray-600 mb-2">Pickup Date: {pickupdate}</p>
          <p className="text-lg text-gray-600 mb-2">Return Date: {returndate}</p>
          <p className="text-lg text-gray-600 mb-2">Total Amount: {total_amount}</p>
        </div>
        <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handlePayment}>
        Make Payment
            </button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default Checkout;

