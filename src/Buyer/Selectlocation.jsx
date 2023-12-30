import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { slectingcarapi } from "../Api/Userapi";

function BookingModal({ onClose, carId }) {
  const [pickupdate, setPickupDate] = useState("");
  const [returndate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async () => {
    try {
      // Validate form fields
      if ( !pickupdate || !returndate) {
        toast.error("All fields are required.", { theme: "dark" });
        return;
      }

      setLoading(true);
      const res = await slectingcarapi( pickupdate, returndate, carId);
      console.log( returndate,carId, "****8*****");
      if (res.status === 201) {
        toast.success("Selected successfully", { theme: "dark" });
      } else {
        toast.error("Server error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Server error", { theme: "dark" });
      console.error("Error submitting booking:", error);
    } finally {
      setLoading(false);
      onClose(); 
    }
  };


  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Booking Modal</h2>
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
