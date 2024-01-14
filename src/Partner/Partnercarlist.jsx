import React, { useEffect, useState } from "react";
import Loading from "../Main/Loading";
import Partnernav from "./Common/Partnernav";
import Partnersidebar from "./Common/Partnersidebar";
import { useSelector } from "react-redux";
import { partner_carapi } from "../Api/Partnerapi";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { cardeleteapi } from "../Api/Partnerapi";


function Partnercarlist() {
  const [loading, setLoading] = useState(false);
  const [carlist, setCarlist] = useState([]);
  const[render,setRender]=useState(false)
  const partner_id = useSelector((state) => state.PartnerReducer.partner);

  useEffect(() => {
    setLoading(true);
    partner_carapi(partner_id)
      .then((res) => {
        setCarlist(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car details: ", error);
        setLoading(false);
      });
  }, [partner_id,render]);


  const handleDelete = (carId) => {
  cardeleteapi(carId)
    .then((response) => {
      if (response.status === 201) {
        if (render === true) {
          setRender(false);
        } else {
          setRender(true);
        }
        toast.success("Car successfully deleted", { theme: "dark" });
      } else if (response.status === 400) {
        toast.error("Car not found", { theme: "dark" });
      } else {
        toast.error("Failed to delete car", { theme: "dark" });
      }
    })
    .catch((error) => {
      console.error("Error deleting car:", error);
      toast.error("Car is booked in the future. Cannot delete ", { theme: "dark" });
    });

   
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
          <section className="py-10 bg-white sm:py-16 lg:py-2 px-2 z-40 relative">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {carlist.map((car) => (
                  <div key={car.id} className="shadow-2xl relative">
                    <div className="h-full relative shadow-2xl shadow-black overflow-hidden group">
                      <div className="absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-black transition-all ease-in-out duration-500">
                        <div className="w-full h-full p-5 relative">
                          <div className="absolute bottom-0 group-hover:bottom-24 text-white text-left transition-all ease-in-out duration-500">
                            <h2 className="text-2xl font-bold text-white mb-0 pb-1">
                              {car.carname}
                            </h2>
                            <p className="text-lg font-light text-white">
                              {car.enginetype}
                            </p>
                            <p className="text-lg font-light text-white">
                              {car.location}
                            </p>
                            <p className="text-lg font-light text-white">
                              ${car.price}
                            </p>
                            <div className="flex items-center space-x-4">
                              {" "}
                              {/* Adjusted space-x-4 */}
                              <button
                                onClick={() => handleDelete(car.id)}
                                className="text-red-500 hover:text-red-700 focus:outline-none"                             >
                                <FaTrash />
                              </button>
                              <button
                                onClick={() => handleEditDetails(car.id)}
                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                              >
                                <FaEdit />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <img
                        src={car.carimage1}
                        className="w-full z-0 h-full object-fill example"
                        alt={`Image ${car.id}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Partnercarlist;
