import React, { useEffect, useState } from "react";
import Loading from "../Main/Loading";
import Partnernav from "./Common/Partnernav";
import Partnersidebar from "./Common/Partnersidebar";
import { useSelector } from "react-redux";
import { partner_bookingapi, updateBookingStatusApi } from "../Api/Partnerapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const extractPageNumberFromUrl = (url) => {
  const match = url.match(/[\?&]page=(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

function Partnerbooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [again, setAgain] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const partner_id = useSelector((state) => state.PartnerReducer.partner);

  useEffect(() => {
    fetchData();
  }, [partner_id]);

  const fetchData = (url) => {
    setLoading(true);
    partner_bookingapi(partner_id, url)
      .then((res) => {
        setDetails(res.data.results);
        setPagination({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleDetails = (id) => {
    const selected = details.find((data) => data.id === id);
    setAgain(selected);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await updateBookingStatusApi(selectedBooking, newStatus);
      if (response.status === 200) {
        console.log(response.data, "vaaaaaaaaaaaaaaaaaaaaa");
        toast.success("Updated successfully");

        // Refetch data after successful update
        fetchData();

        // Reset selectedBooking and newStatus
        setSelectedBooking(null);
        setNewStatus("");

        console.log("Status updated successfully", { theme: "dark" });
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "canceled":
        return " text-1xl font-bold text-red-900";
      case "reserved":
        return " text-1xl font-bold text-orange-900";
      case "running":
        return " text-1xl font-bold text-green-900";
      case "completed":
        return " text-1xl font-bold text-blue-900";
      default:
        return "";
    }
  };

  const handlePageChange = async (url) => {
    try {
      const pageNumber = extractPageNumberFromUrl(url);

      if (!isNaN(pageNumber) && pageNumber > 0) {
        const apiUrl = { page: pageNumber }; // Correct way to construct the object
        await fetchData(apiUrl);
      } else {
        console.error("Invalid page number:", pageNumber);
      }
    } catch (error) {
      console.error("Error while fetching the next page:", error);
    }
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
              {again ? (
                // Render details for the selected booking
                <div className="w-1/2 bg-black py-10 px-10 ml-20">
                  <h3 className="font-semibold text-2xl text-white">
                    BuyerName: {again.buyer.user.username}
                  </h3>
                  <h3 className="font-semibold text-2xl text-white">
                    Buyer number: {again.buyer.user.phone_number}
                  </h3>
                  <img
                    src={again.buyer.buyer_image}
                    alt={again.buyer.buyer_image}
                    className="w-20  mt-4 mb-4"
                  />
                  <img
                    src={again.car.carimage1}
                    alt={again.car.carname}
                    className="w-28 mt-4 mb-4"
                  />

                  <p className="text-2xl text-white">
                    {" "}
                    BuyerName: {again.buyer.user.username}
                  </p>

                  <p className="text-2xl text-white">
                    booked carprice: {again.car.price}
                  </p>
                  <p className="text-2xl text-white">
                    Engine Type: {again.car.enginetype}
                  </p>
                  <p className="text-2xl text-white">
                    Car Type: {again.car.car_type}
                  </p>

                  {/* Close button to go back to the table view */}
                  <button
                    onClick={() => setAgain(null)}
                    className="bg-blue-500 hover:bg-black text-white py-2 px-4 rounded-full mt-4"
                  >
                    Close
                  </button>
                </div>
              ) : (
                // Render the table view
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
                          <th className="py-2 px-4 text-left">id</th>
                          <th className="py-2 px-4 text-left">pickupdate</th>
                          <th className="py-2 px-4 text-left">returndate</th>
                          <th className="py-2 px-4 text-left">status</th>
                          <th className="py-2 px-4 text-left">total_amount</th>
                          <th className="py-2 px-4 text-left">
                            update status{" "}
                          </th>
                          <th className="py-2 px-4 text-left">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {details.map((data, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-blue-100 text-black" : ""
                            }
                          >
                            <td className="py-2 px-4">{data.id}</td>
                            <td className="py-2 px-4">{data.pickupdate}</td>
                            <td className="py-2 px-4">{data.returndate}</td>

                            <td
                              className={`py-2 px-4 ${getStatusColor(
                                data.status
                              )}`}
                            >
                              {data.status}
                            </td>

                            <td className="py-2 px-4">{data.total_amount}</td>
                            <td className="py-2 px-4">
                              {["completed", "canceled"].includes(
                                data.status
                              ) ? (
                                <button
                                  className="bg-black opacity-50 cursor-not-allowed text-white py-2 px-4 rounded-full"
                                  disabled
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="mr-2"
                                  />
                                  Edit
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedBooking(data.id);
                                    setNewStatus(data.status);
                                  }}
                                  className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out mr-2"
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="mr-2"
                                  />
                                  Edit
                                </button>
                              )}
                            </td>
                            <td className="py-2 px-4">
                              <button
                                onClick={() => handleDetails(data.id)}
                                className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
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
            <div className="w-full mt-4 flex justify-center">
              {pagination && (
                <nav className="block">
                  <ul className="flex pl-0 rounded list-none flex-wrap">
                    {pagination.previous && (
                      <li className="relative inline-block">
                        <button
                          onClick={() => handlePageChange(pagination.previous)}
                          className="relative block py-2 px-3 leading-tight bg-black border border-gray-800 text-white font-bold border-r-0 ml-0 rounded-l hover:bg-green-500"
                        >
                          Previous
                        </button>
                      </li>
                    )}
                    {pagination.next && (
                      <li className="relative inline-block">
                        <button
                          onClick={() => handlePageChange(pagination.next)}
                          className="relative block py-2 px-3 leading-tight bg-black border border-gray-800 text-white border-l-0 rounded-r hover:bg-red-800"
                        >
                          Next
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </section>
        </div>
      )}

      {selectedBooking !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-100 rounded border-black shadow-lg p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <label
              htmlFor="newStatus"
              className="block text-sm font-medium text-black"
            >
              New Status:
            </label>
            <select
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
            >
              <option value="canceled">Canceled</option>
              <option value="reserved">Reserved</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
            </select>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-black hover:bg-black-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out mr-2 focus:outline-none focus:ring focus:ring-blue-200"
                onClick={handleUpdateStatus}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-gray-200"
                onClick={() => {
                  setSelectedBooking(null);
                  setNewStatus("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Partnerbooking;
