import React, { useEffect, useState } from "react";
import Loading from "../../Main/Loading";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import { toast } from "react-toastify";
import { bookinglist_api } from "../../Api/Adminapi";

const extractPageNumberFromUrl = (url) => {
  const match = url.match(/[\?&]page=(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

function Adminibooklist() {
  const [loading, setLoading] = useState(false);
  const [bookedlist, setBookedlist] = useState([]);
  const [pagination, setPagination] = useState(null);

  const booklist = async (url) => {
    console.log(url, "okkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    try {
      setLoading(true);
      const res = await bookinglist_api(url);
      if (res.status === 200) {
        console.log(res.data, "----------85858--------");
        setLoading(false);
        setBookedlist(res.data.results);
        setPagination({
          count: res.data.count,
          next: res.data.next,
          previous: res.data.previous,
        });
        console.log(pagination, "8888888888888888");
        console.log(res.data, "------2----");
        console.log(bookedlist, "-----1----");
      } else {
        setLoading(false);
        toast.error("Loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Server error");
      setLoading(false);
    }
  };

  const handlePageChange = async (url) => {
    try {
      const pageNumber = extractPageNumberFromUrl(url);

      if (!isNaN(pageNumber) && pageNumber > 0) {
        const apiUrl = { page: pageNumber }; // Pass the page number as an object
        await booklist(apiUrl);
      } else {
        console.error("Invalid page number:", pageNumber);
      }
    } catch (error) {
      console.error("Error while fetching the next page:", error);
    }
  };

  useEffect(() => {
    booklist();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex">
          <Adminsidebar />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-2 py-2 w-full">
            <section className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-1 mx-auto">
                <h1 className="text-1xl font-semibold text-black capitalize lg:text-3xl dark:text-white">
                  Book List
                </h1>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {bookedlist.map((data, index) => (
                    <div
                      key={data.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      } border border-separate rounded border-slate-200 transition duration-300 p-4 text-left`}
                    >
                      <div className="flex flex-col items-center">
                        {/* Display Buyer Image */}
                        <img
                          src={
                            data?.buyer?.buyer_image
                              ? data.buyer.buyer_image
                              : "/src/assets/images/profile.jpg"
                          }
                          alt="Buyer Image"
                          className="w-16 h-16 rounded-full mx-auto mb-2"
                        />
                        <img
                          src={
                            data.car.partner.partner_image
                              ? data.car.partner.partner_image
                              : "/src/assets/images/profile.jpg"
                          }
                          alt="Partner Image"
                          className="w-16 h-16 rounded-full mx-auto mb-2"
                        />
                        {/* Display Partner Image */}
                        <div className="text-left">
                          <p className="text-sm font-bold text-black mb-2">
                            Buyer: {data.buyer.user.username}
                          </p>
                          <p className="text-sm font-bold text-black mb-2">
                            Pickup Date: {data.pickupdate}
                          </p>
                          <p className="text-sm font-bold text-black mb-2">
                            Return Date: {data.returndate}
                          </p>
                          <p className="text-sm font-bold text-black mb-2">
                            Status: {data.status}
                          </p>
                          <p className="text-sm font-bold text-black mb-2">
                            Total Amount: {data.total_amount}
                          </p>
                          <p className="text-sm font-bold text-black mb-2">
                            Car Name: {data.car.carname}
                          </p>
                          <p className="text-sm font-bold text-black mb-2">
                            Partner Name: {data.car.partner.user.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full mt-4 flex justify-center">
                  {pagination && (
                    <nav className="block">
                      <ul className="flex pl-0 rounded list-none flex-wrap">
                        {pagination.previous && (
                          <li className="relative inline-block">
                            <button
                              onClick={() =>
                                handlePageChange(pagination.previous)
                              }
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
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Adminibooklist;
