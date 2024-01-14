import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Main/Loading";
import Buyernav from "./Common/Buyernav";
import { useSelector } from "react-redux";
import { geting_partnerapi } from "../Api/Userapi";
import defaultImage from "/src/assets/images/profile.jpg";

function Buyerchat() {
  const byer_id = useSelector((state) => state.useReducer.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [partner, setPartner] = useState([]);

  const userid = async (byer_id) => {
    try {
      const res = await geting_partnerapi(byer_id);
      if (res.status === 200) {
        console.log(res.data.partner_data, '=========852=======');
        setPartner(res?.data?.partner_data);
      } else {
        console.log("not getting");
      }
    } catch (error) {
      console.log("server error");
    }
  };

  useEffect(() => {
    userid(byer_id);
  }, []);




  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Buyernav className="p-0 m-0" />
          <div className="h-screen">
            <section className="flex flex-col justify-center antialiased bg-black  text-gray-600 min-h-full p-4">
              <div className="h-full">
                <div className="relative max-w-[550px] mx-auto bg-white shadow-lg rounded-lg  overflow-y-auto">
                  <div className="px-5 h-96">
                    <h3 className="font-semibold uppercase text-black  flex justify-center text-3xl mb-1">
                      Chat List
                    </h3>
                    <div className="divide-y divide-gray-200">
                      {partner?.map((data) => (
                        <button
                          key={data.id}
                          className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
                          onClick={() => navigate("/buyer/chating", { state: { partnerId:data.id,partnername:data.username }, })}
                        >
           
                          <div className="flex items-center">
                            <img
                              className="rounded-full items-start flex-shrink-0 mr-3"
                              src={`http://localhost:8000${data.image_url || defaultImage}`}
                              width="32"
                              height="32"
                              alt={data.image_url}
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">
                                {data.username}
                              </h4>
                              <div className="text-[13px]">
                                {data.username}
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

export default Buyerchat;
