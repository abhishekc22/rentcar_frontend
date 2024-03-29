import React, { useEffect } from "react";
import { boookingapi } from "../Api/Userapi";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Payment() {
  const get_payment_details = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("success") && urlParams.get("success") === "true") {
      const sessionId = urlParams.get("session_id");
      const pickupdate = urlParams.get("pickupdate");
      const returndate = urlParams.get("returndate");
      const total_amount = urlParams.get("total_amount");
      const car_location = urlParams.get("car_location");
      const buyer_name = urlParams.get("buyer_name");

      try {
        const res = await boookingapi(
          pickupdate,
          returndate,
          total_amount,
          car_location,
          buyer_name
        );
        if (res.status === 201) {
          toast.success(" payment successfull");
        } else {
          toast.error("booking cancelled");
        }
      } catch (error) {
       
      }
    }
  };

  useEffect(() => {
    get_payment_details();

    console.log();
  });
  return (
    <>
      <div class="bg-gray-100 h-screen">
        <div class="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            class="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p class="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            {/* Call and Chat logos section */}
            <div class="flex justify-center items-center my-4">
              <img
                src="https://res.cloudinary.com/dhbzojgfp/image/upload/v1705763709/call_jjbaqi.jpg"
                alt="Call Logo"
                class="mr-4 w-10 h-11"
              />
              <img
                src="https://res.cloudinary.com/dhbzojgfp/image/upload/v1705763712/chat_nfibk6.png"
                alt="Chat Logo"
                class="w-10 h-11"
              />
            </div>
            {/* End of Call and Chat logos section */}
            <div className="py-10 text-center">
              <Link
                to="/buyer/buyerhome"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
