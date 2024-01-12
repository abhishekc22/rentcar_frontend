import React, { useEffect, useState } from "react";
import Loading from "../Main/Loading";
import Partnernav from './Common/Partnernav'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getbuyer_api } from "../Api/Partnerapi";

function Partnerchat() {
  const partner_id=useSelector((state)=>state.PartnerReducer.partner);
  console.log(partner_id,'----1-----')


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState([]);



  const buyerlist=async(partner_id)=>{
    try{
      const res= await getbuyer_api(partner_id)
      if (res.status === 201) {
        console.log(res.data, '=========852=======');
        setBuyer(res?.data);
      } else {
        console.log("not getting");
      }
    } catch (error) {
      console.log("server error");
    }
  };



  useEffect(() => {
    buyerlist(partner_id)
   
  },[] );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Partnernav className="p-0 m-0" />
          <div className="h-screen">
            <section className="flex flex-col justify-center antialiased bg-black  text-gray-600 min-h-full p-4">
              <div className="h-full">
                <div className="relative max-w-[550px] mx-auto bg-white shadow-lg rounded-lg  overflow-y-auto">
                  <div className="px-5 h-96">
                    <h3 className="font-semibold uppercase text-black  flex justify-center text-3xl mb-1">
                      Chat List
                    </h3>
                    <div className="divide-y divide-gray-200">
                      {buyer.map((data) => ( // Use 'buyer' instead of 'partner'
                        <button
                          key={data.buyer_id}
                          className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
                          onClick={() => navigate("/partner/chating", { state: { partnerId: data.buyer_id } })}
                        >
                          <div className="flex items-center">
                            <img
                              className="rounded-full items-start flex-shrink-0 mr-3"
                              src={data.buyer_image}
                              width="32"
                              height="32"
                              alt={data.buyer_image}
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">
                                {data.buyer_name}
                              </h4>
                              <div className="text-[13px]">
                                {data.buyer_name}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default Partnerchat;
