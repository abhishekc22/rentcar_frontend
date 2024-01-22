import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Main/Loading";
import Buyernav from "./Common/Buyernav";
import { get_bookdetails, cancelapi } from "../Api/Userapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Bookindetails() {
  const user_id = useSelector((state) => state.useReducer.user);

  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render,setRender]=useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    get_bookdetails(user_id)
      .then((response) => {
        setBooked(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking details: ", error);
        setLoading(false);
      });
  }, [user_id,render]);

  const handleCancel = async (bookingId) => {
    try {
      const res = await cancelapi(bookingId);

      if (res.status === 200) {
        if (render===true){
          setRender(false);
        }else{
          setRender(true)
        }
        toast.success("You have canceled the order successfully");
      } else {
        toast.error("Server error");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const handleDetails = (id) => {
    const selected = booked.find((data) => data.id === id);
    setSelectedBooking(selected);
  };

  return (
    <>
      <Buyernav />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div>
          <section className="relative py-8 bg-blueGray-50">
            <div className="w-full mb-12 px-4">
              {selectedBooking ? (
                // Render details for the selected booking
                <div className="w-1/2 bg-black py-10 px-10 ml-20">
                  <h3 className="font-semibold  text-2xl text-white">
                    owner name: {selectedBooking.car.partner.user.username}
                  </h3>
                  <h3 className="font-semibold  text-2xl text-white">
                    owner number:{" "}
                    {selectedBooking.car.partner.user.phone_number}
                  </h3>
                  <img
                    src={selectedBooking.car.carimage1}
                    alt={selectedBooking.car.carname}
                    className="max-w-full mt-4 mb-4"
                  />
                  <p className="text-2xl text-white">
                    Car Name: {selectedBooking.car.carname}
                  </p>
                  <p className="text-2xl text-white">
                    Location: {selectedBooking.car.location}
                  </p>
                  <p className="text-2xl text-white">
                    Partner: {selectedBooking.car.price}
                  </p>
                  <p className="text-2xl text-white">
                    Partner: {selectedBooking.car.enginetype}
                  </p>
                  <p className="text-2xl text-white">
                    Partner: {selectedBooking.car.car_type}
                  </p>

                  {/* Close button to go back to the table view */}
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="bg-blue-500 hover:bg-black text-white py-2 px-4 rounded-full mt-4"
                  >
                    Close
                  </button>
                </div>
              ) : (
                // Render the table when no booking is selected
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
                          <th className="py-2 px-4 text-left">actions</th>
                          <th className="py-2 px-4 text-left">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {booked.map((data, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white text-black" : ""
                            }
                          >
                            <td className="py-2 px-4">{data.pickupdate}</td>
                            <td className="py-2 px-4">{data.returndate}</td>
                            <td className="py-2 px-4">{data.status}</td>
                            <td className="py-2 px-4">{data.total_amount}</td>
                            <td className="py-2 px-4">
                              {data.status === "reserved" && (
                                <button
                                  onClick={() => handleCancel(data.id)}
                                  className="bg-gray-500 hover:bg-red-700 text-black py-2 px-4 rounded-full transition duration-300 ease-in-out"
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                            <td className="py-2 px-4">
                              <button
                                onClick={() => handleDetails(data.id)}
                                className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="mr-2"
                                />
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Bookindetails;
