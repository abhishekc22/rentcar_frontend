import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Adminsidebar from "./Adminsidebar";
import Adminchart from "../pages/Adminchart";
import { useSelector } from "react-redux";
import { adminwallet_inf0 } from "../../Api/Adminapi";

function Overviewdashboard() {
  const[admin,setAdmin]=useState(null)
  const[sales,setSales]=useState(null)
  const Admin_id=useSelector((state)=>state.AdminrRducer.admin)
  console.log(Admin_id,'99999999999')


  useEffect(()=>{
    adminwallet_inf0(Admin_id)
    .then((response)=>{
      console.log(response.data,'----+++++++++-------')
      setAdmin(response.data)
      setSales(response.data.monthly_sales_data)
    
    })
    .catch((error)=>{
      console.log(error.message);
    })
  },[])

  console.log(sales,'5555555555555555')

 
  return (
    <>
          <Navbar />
          <div className="flex">
            <Adminsidebar />
            <div className="flex flex-col ml-2  py-1 px-5 w-9/12">
              <div className=" flex space-x-26 gap-10">
                <div className="w-6/12 h-[150px] bg-yellow-300 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
                  <span className="font-bold text-1xl">Wallet</span>
                  <span className="text-black font-bold  text-2xl">
                    ${admin?.wallet}
                
                  </span>
                </div>
                <div className="w-6/12 h-[150px] bg-red-600 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
                  <span className="font-bold text-1xl">Number of Sales</span>
                  <span className="text-black font-bold  text-2xl">
                   Count:{admin?.total_bookings}
                  </span>
                </div>
                <div className="w-6/12 h-[150px] bg-green-300 border-black border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-900">
                  <span className="font-bold text-1xl">Total Bookings  Amount </span>
                  <span className="text-black font-bold  text-2xl">
                  ${admin?.total_booking_amount}
                  </span>
                </div>
              </div>
              <Adminchart monthlySalesData={sales} />
            </div>
          </div>
        </>
  );
}

export default Overviewdashboard;
