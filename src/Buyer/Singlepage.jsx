import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { singlepageapi } from "../Api/Userapi";
import Loading from "../Main/Loading";
import Buyernav from "./Common/Buyernav";
import BookingModal from "./Selectlocation";

function Singlepage() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const carId = location.state.car_id;
  console.log(carId, "--------------");

  const [single, setSingle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const singlepage = async () => {
    setLoading(true);
    try {
      const res = await singlepageapi(carId);
      if (res.status === 200) {
        setLoading(false);
        setSingle(res?.data);
        console.log(single, "++++++++++++++");
      } else {
        toast.error("loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  useEffect(() => {
    singlepage();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Buyernav />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="hero min-h-screen bg-black">
            <div className="hero-content flex flex-col md:flex-row lg:flex-row">
              <img
                src={`http://localhost:8000${single?.carimage1}`}
                className="w-96 md:w-full lg:w-6/12 h-auto"
                alt="car"
              />
              <div className="flex flex-col md:flex-row lg:flex-row md:space-x-4 lg:space-x-4 md:w-full lg:w-2/3">
                <div className="w-full md:w-1/2 lg:w-1/2">
                  <h1 className="text-5xl mb-4 font-bold text-white">
                    {single?.carname}
                  </h1>
                  <h1 className="text-5xl mb-4 font-bold text-white">
                    ${single?.price}/day
                  </h1>
                  <h1 className="text-2xl font-bold text-white">
                    Owner name: {single?.partner.user.username}
                  </h1>
                  <h1 className="text-2xl font-bold text-white">
                    Location: {single?.location}
                  </h1>
                  <p className="py-6 text-slate-600">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary" onClick={openModal}>
                    Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <BookingModal onClose={closeModal} carId={single} />}
    </>
  );
}

export default Singlepage;
