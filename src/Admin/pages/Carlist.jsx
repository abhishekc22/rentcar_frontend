import React, { useEffect, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import Loading from "../../Main/Loading";
import "react-toastify/dist/ReactToastify.css";
import { carlist } from "../../Api/Adminapi";
import { toast } from "react-toastify";
import { verify } from "../../Api/Adminapi";
import _debounce from "lodash/debounce";
import { cardetailsapi } from "../../Api/Adminapi";

const extractPageNumberFromUrl = (url) => {
  const match = url.match(/[\?&]page=(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

function Carlist() {
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState([]);
  const [block, setBlock] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [carIdToVerify, setCarIdToVerify] = useState(null);
  const [hoveredCarId, setHoveredCarId] = useState(null);
  const [cardetails, setCardetails] = useState(null);
  const [pagination, setPagination] = useState(null);

  const debouncedSetHoveredCarId = _debounce((id) => setHoveredCarId(id), 600);

  const Carlist = async (url) => {
    try {
      const res = await carlist(url);
      if (res.status === 200) {
        setLoading(true);
        setCar(res?.data.results);
        setPagination({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
        });
        setLoading(false);
        console.log(res?.data, "*/*/*/");
      } else {
        toast.error("loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error");
      setLoading(false);
    }
  };

  const handlePageChange = async (url) => {
    try {
      const pageNumber = extractPageNumberFromUrl(url);

      if (!isNaN(pageNumber) && pageNumber > 0) {
        const apiUrl = { page: pageNumber }; // Pass the page number as an object
        await Carlist(apiUrl);
      } else {
        console.error("Invalid page number:", pageNumber);
      }
    } catch (error) {
      console.error("Error while fetching the next page:", error);
    }
  };

  useEffect(() => {
    Carlist();
  }, [block]);

  const handleVerification = async (carid) => {
    setCarIdToVerify(carid);
    setShowModal(true);
  };

  const confirmVerification = async () => {
    try {
      const res = await verify(carIdToVerify);
      if (res.status === 201) {
        setLoading(true);
        console.log(res?.data);
        setBlock(res?.data);
        setLoading(false);
        toast.success("updated successfully", { theme: "dark" });
      }
      if (res.status === 400) {
        console.log(res.data, "-------------------");
        toast.error(message, { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error", { theme: "dark" });
      console.log(error.message);
    } finally {
      setShowModal(false);
      setCarIdToVerify(null);
    }
  };

  const cancelVerification = () => {
    setShowModal(false);
    setCarIdToVerify(null);
  };

  const handleCarDetails = async (carId) => {
    try {
      const res = await cardetailsapi(carId);
      if (res.status === 200) {
        setCardetails(res.data);
        console.log(res.data, "----1------");
      } else {
        toast.error("Server error", { theme: "dark" });
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Error fetching car details", { theme: "dark" });
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex">
          <Adminsidebar />
          <div className="  py-2 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 w-full ml-2">
            {car.map((data) => (
              <div
                key={data.id}
                className="bg-black border dark:border-gray-800 p-4 rounded-md"
              >
                <div className="font-medium dark:text-white">
                  <span>Partner Name:</span> {data.partner.user.username}
                </div>
                <div className="font-medium dark:text-white">
                  <span>Car Name:</span> {data.carname}
                </div>
                <div className="font-medium dark:text-white">
                  <span>Location:</span> {data.location}
                </div>
                <div className="font-medium dark:text-white">
                  <span>Price:</span> ${data.price}
                </div>
                <div className="py-4 relative">
                  {hoveredCarId === data.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                      <span
                        className="cursor-pointer"
                        onClick={() => handleCarDetails(data.id)}
                      >
                        Car Detail
                      </span>
                    </div>
                  )}
                  <img
                    src={data.carimage1}
                    alt="Car Image 1"
                    className="max-w-full max-h-36 object-cover rounded-md"
                    onMouseEnter={() => debouncedSetHoveredCarId(data.id)}
                    onMouseLeave={() => debouncedSetHoveredCarId(null)}
                  />
                </div>
                <div className="py-4">
                  {data.is_blocked === true ? (
                    <button
                      onClick={() => {
                        handleVerification(data.id);
                      }}
                      className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
                    >
                      UnList
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleVerification(data.id);
                      }}
                      className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full"
                    >
                      List
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {cardetails && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="bg-opacity-75 bg-black absolute inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden z-50">
            <div className="p-5">
              <h2 className="text-3xl font-bold mb-2"> {cardetails.carname}</h2>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-1xl font-bold ">Car Image:</p>
                  <img
                    src={cardetails.carimage1}
                    alt="Car Image"
                    className="max-w-full w-36 h-auto rounded-md"
                  />
                </div>
                <div>
                  <p className="text-1xl font-bold ">
                    owner:{cardetails.partner.user.username}
                  </p>
                  <img
                    src={cardetails.partner.partner_image}
                    alt="Owner Image"
                    className="max-w-full w-36 h-auto rounded-md"
                  />
                </div>
                <div>
                  <p className="text-1xl font-bold ">Car Document:</p>
                  <img
                    src={cardetails.document}
                    alt="Car Document"
                    className="max-w-full w-36 h-auto rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className=" font-bold text-1xl">Engine Type:</p>
                <p>{cardetails.enginetype}</p>
              </div>
              <div>
                <p className=" font-bold text-1xl">Location:</p>
                <p>{cardetails.location}</p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setCardetails(null)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="bg-opacity-75 bg-black absolute inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden z-50">
            <div className="p-5">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to proceed?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={confirmVerification}
                  className="mr-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelVerification}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    </>
  );
}

export default Carlist;
