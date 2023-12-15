import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { singlepageapi } from "../Api/Userapi";
import Loading from "../Main/Loading";
import Buyernav from "./Common/Buyernav";


function Singlepage() {
 const [loading, setLoading] = useState(false);
  const location = useLocation();
  const carId = location.state.car_id;
  console.log(carId, "--------------");

  const [single, setSingle] = useState(null);

  const singlepage = async () => {
    try {
      
      const res = await singlepageapi(carId);
      if (res.status === 200) {
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

  return (
    <>
    <Buyernav/>
    {loading ? (
        <Loading />
      ) : (
      <div>
        <div className="hero min-h-screen  bg-black">
          <div className="hero-content flex flex-col lg:flex-row">
            <img
              src=
              {single?.carimage1}
              
              className="max-w-md rounded-lg shadow-2xl"
              alt="car"
            />
            <div>
              <h1 className="text-5xl mb-4 font-bold text-white">{single?.carname}</h1>
              <h1 className="text-5xl  mb-4 font-bold text-white">${single?.price}/day</h1>
              <h1 className="text-2xl font-bold text-white">Owner name:{single?.partner.user.username}</h1>
              <h1 className="text-2xl font-bold text-white">Location:{single?.location}</h1>
              <h1 className="text-2xl font-bold text-white">phone number of {single?.partner.user.phone_number}</h1>

              <p className="py-6  text-slate-600">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Booking</button>
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
}

export default Singlepage;
