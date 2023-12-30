import React from "react";

function Checkout() {
  return (
    <div className="bg-red-500 w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-4 md:px-10 lg:px-2 bg-white py-40">
        <img
          src="/assets/images/partnerlogin2.jpg"
          alt="Car"
          className="col-span-1 md:col-span-2 lg:col-span-1 h-auto"
        />
        <div className="col-span-1 md:col-span-1 lg:col-span-1 px-80">
          <table className="table-auto border">
            <tbody>
              <tr>
                <td className="font-bold border">Car Name</td>
                <td className="border">Car Model XYZ</td>
              </tr>
              <tr>
                <td className="border">Price</td>
                <td className="border">$50 per day</td>
              </tr>
              <tr>
                <td className="border">Days</td>
                <td className="border">5 days</td>
              </tr>
              <tr>
                <td className="border">Pick-up Location</td>
                <td className="border">Your Location</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
