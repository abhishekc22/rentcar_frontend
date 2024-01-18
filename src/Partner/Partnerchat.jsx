import React, { useEffect, useState } from "react";
import Loading from "../Main/Loading";
import Partnernav from "./Common/Partnernav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getbuyer_api } from "../Api/Partnerapi";
import defaultImage from "/src/assets/images/profile.jpg";

function Partnerchat() {
  const partner_id = useSelector((state) => state.PartnerReducer.partner);
  console.log(partner_id, "----1-----");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState([]);

  const buyerlist = async (partner_id) => {
    try {
      setLoading(true);
      const res = await getbuyer_api(partner_id);
      if (res.status === 201) {
        console.log(res.data, "=========852=======");
        setLoading(false);
        setBuyer(res?.data);
      } else {
        setLoading(false);
        console.log("not getting");
      }
    } catch (error) {
      setLoading(false);
      console.log("server error");
    }
  };

  useEffect(() => {
    buyerlist(partner_id);
  }, []);

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
                      {buyer.map(
                        (
                          data // Use 'buyer' instead of 'partner'
                        ) => (
                          <button
                            key={data.buyer_id}
                            className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
                            onClick={() =>
                              navigate("/partner/chating", {
                                state: {
                                  buyerid: data.buyer_id,
                                  buyername: data.buyer_name,
                                },
                              })
                            }
                          >
                            <div className="flex items-center">
                            {data.buyer_image ? (
                              <img
                                className="rounded-full items-start flex-shrink-0 mr-3"
                                src={data.buyer_image}
                                alt="Image"
                                width="32"
                                height="32"
                              />
                            ) : (
                              <img
                                className="rounded-full items-start flex-shrink-0 mr-3"
                                src={defaultImage}
                                alt="Default Image"
                                width="32"
                                height="32"
                              />
                            )}
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
                        )
                      )}
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
