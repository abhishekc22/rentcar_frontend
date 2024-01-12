import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { slectingcarapi } from "../Api/Userapi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookingModal({ onClose, carId }) {
  const user_id = useSelector((state) => state.useReducer.user);
  console.log("======================", user_id);

  const navigate=useNavigate()

  const [pickupdate, setPickupDate] = useState("");
  const [returndate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleBookingSubmit = async () => {
    try {
      // Validate form fields
      if (!pickupdate || !returndate) {
        toast.error("All fields are required.", { theme: "dark" });
        return;
      }

      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

      // Convert pickupdate and returndate to Date objects
      const pickDate = new Date(pickupdate);
      const returnDate = new Date(returndate);

      // Compare with today's date
      if (pickDate <= today || returnDate <= today) {
        toast.error("you are  selected  wrong  date", { theme: "dark" });
        return;
      }
      if (returnDate < pickDate) {
        toast.error("Return date must be greater than or equal to pick-up date.", { theme: "dark" });
        return;
      }

      setLoading(true);
      const res = await slectingcarapi( pickupdate, returndate, carId,user_id);
      console.log(pickupdate, returndate,carId, "****8*****");
      if (res.status === 201) {
        toast.success(`welcome to payment page mr.  ${res?.data?.buyer_name}`, { theme: "dark" });
        const { buyer_name,ownername,car_location,owner_phonenumber, pickupdate, returndate,total_amount, carimage,document} = res.data;

        navigate("/buyer/checkout", {
          state: {
            ownername:ownername,
            buyer_name:buyer_name,
            owaner_phonenumber:owner_phonenumber,
            car_location:car_location,
            pickupdate: pickupdate,
            returndate: returndate,
            total_amount: total_amount,
            carimage:carimage,
            document:document,

          },
        });      
      } else {
        toast.error(`server error: ${res?.data?.message}`, { theme: "dark" });
      }



      
    } catch (error) {
      toast.error("Date is alredy booked", { theme: "dark" });
      console.error("Error submitting booking:", error);
    } finally {
      setLoading(false);
      onClose(); 
    }
  };


  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Select the date</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="flex-1 font-bold px-3">
            Pickup Date:
            <input
              type="date"
              value={pickupdate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="input input-bordered"
              required
            />
          </label>
          <label className="flex-1 font-bold">
            Return Date:
            <input
              type="date"
              value={returndate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input input-bordered"
              required
            />
          </label>
        </div>
        <div className="flex mt-4">
          <button
            onClick={handleBookingSubmit}
            className={`flex-1 bg-black text-white px-4 py-2 rounded-md mr-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            Details
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black text-white px-4 py-2 rounded-md ml-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
