import React, { useEffect, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import Loading from "../../Main/Loading";
import "react-toastify/dist/ReactToastify.css";
import { carlist } from "../../Api/Adminapi";
import { toast } from "react-toastify";
import { verify } from "../../Api/Adminapi";

function Carlist() {
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState([]);
  const [block, setblock] = useState(false);
  
  const Carlist = async () => {
    try {
      const res = await carlist();
      if (res.status == 200) {
        setLoading(false);
        setCar(res?.data);
        console.log(res?.data,'*/*/*/');

      } else {
        toast.error("loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error");
      setLoading(false);
    }
  };

  useEffect(() => {
    Carlist();
  }, [block]);


  const handleverifiaction = async (carid) => {
    try {
      const res = await verify(carid);
      if (res.status == 201) {
        console.log(res?.data)
        setblock(res?.data);
        toast.success("updated succesfully", { theme: "dark" });
      } else {
        toast.error("error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error", { theme: "dark" });
      console.log(error.message);
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
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-white dark:text-black border-b dark:border-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    partnername
                  </th>
                  <th scope="col" className="px-6 py-3">
                    carname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    document
                  </th>
                  <th scope="col" className="px-6 py-3">
                    carimage1
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {car.map((data) => (
                  <tr
                    key={data.id}
                    className="bg-white border-b dark:border-black"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap dark:text-black"
                    >
                      {data.partner.user.username}
                    </th>
                    <td className="px-6 py-4 dark:text-black font-medium">
                      {data.carname}
                    </td>
                    <td className="px-6 py-4 dark:text-black font-medium">
                      {data.location}
                    </td>
                    <td className="px-6 py-4 dark:text-black font-medium">
                      ${data.price}
                    </td>
                    <td className="px-6 py-4">
                      {/* Assuming 'document' is a field with an image URL */}
                      <img src={data.document} alt="document" />
                    </td>
                    <td className="px-6 py-4">
                      {/* Assuming 'carimage1' is a field with an image URL */}
                      <img src={data.carimage1} alt="Car Image 1" />
                    </td>
                    <td className="px-6 py-4">
                      {data.is_blocked === true ? (
                        <button
                          onClick={() => {
                            handleverifiaction(data.id);
                          }}
                          className="w-full lg:px-12 bg-gradient-to-r from-red-500 hover:from-white hover:to-black py-3 text-center border text-black border-black rounded-full sm:w-full "
                        >
                          UnList
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleverifiaction(data.id);
                          }}
                          className="w-full lg:px-12 bg-gradient-to-r from-green-500  hover:to-black py-3 text-center border text-black border-black rounded-full sm:w-full "
                        >
                          List
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Carlist;
