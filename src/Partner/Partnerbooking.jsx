import React, { useEffect, useState } from "react";
import Loading from "../Main/Loading";
import Partnernav from "./Common/Partnernav";
import Partnersidebar from "./Common/Partnersidebar";
import { useSelector } from "react-redux";
import { partner_bookingapi } from "../Api/Partnerapi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Partnerbooking() {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const partner_id = useSelector((state) => state.PartnerReducer.partner);

  useEffect(() => {
    setLoading(true);
    partner_bookingapi(partner_id)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [partner_id]);

  const handleDetails = (id) => {
    // Handle details button click
  };

  return (
    <>
      <Partnernav />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="flex flex-row lg:flex-row">
          <Partnersidebar />
          <section className="relative py-2 w-full bg-blueGray-50">
            <div className="w-full mb-12 px-2">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-black text-white">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-lg text-white">
                        Booking details
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="block w-full overflow-x-auto">
                  <table className="table-auto w-full bg-transparent border-collapse">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="py-2 px-4 text-left">pickupdate</th>
                        <th className="py-2 px-4 text-left">returndate</th>
                        <th className="py-2 px-4 text-left">status</th>
                        <th className="py-2 px-4 text-left">total_amount</th>
                        {/* <th className="py-2 px-4 text-left">recived amount</th> */}
                        <th className="py-2 px-4 text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((data, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-blue-100 text-black" : ""}
                        >
                          <td className="py-2 px-4">{data.pickupdate}</td>
                          <td className="py-2 px-4">{data.returndate}</td>
                          <td className="py-2 px-4">{data.status}</td>
                          <td className="py-2 px-4">{data.total_amount}</td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleDetails(data.id)}
                              className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
                            >
                              <FontAwesomeIcon icon={faEye} className="mr-2" />
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Partnerbooking;
