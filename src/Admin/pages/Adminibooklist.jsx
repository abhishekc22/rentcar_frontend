import React, { useEffect, useState } from "react";
import Loading from "../../Main/Loading";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import { toast } from "react-toastify";
import { bookinglist_api } from "../../Api/Adminapi";

function Adminibooklist() {
  const [loading, setLoading] = useState(false);
  const [bookedlist, setBookedlist] = useState([]);

  const booklist = async () => {
    try {
      setLoading(true);
      const res = await bookinglist_api();
      if (res.status === 200) {
        console.log(res.data, "----------85858--------");
        setLoading(false);
        setBookedlist(res.data);
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
              <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-black capitalize lg:text-4xl dark:text-white">
                  Book List
                </h1>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {bookedlist.map((data, index) => (
                    <div
                      key={data._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      } border border-separate rounded border-slate-200 transition duration-300 p-4 text-left`}
                    >
                      <div className="flex flex-col items-center">
                        {/* Display Buyer Image */}
                        <img
                          src={
                            data?.buyer?.buyer_image ||
                            "src/assets/images/Profile.jpg"
                          }
                          alt="Buyer Image"
                          className="w-16 h-16 rounded-full mx-auto mb-2"
                        />

                        <img
                          src={
                            data?.car?.partner?.partner_image ||
                            "src/assets/images/profile.jpg"
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
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Adminibooklist;
