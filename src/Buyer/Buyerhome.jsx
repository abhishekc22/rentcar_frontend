import React, { useEffect, useState } from "react";
import Buyernav from "./Common/Buyernav";
import Loading from "../Main/Loading";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { carlistuserapi } from "../Api/Userapi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Buyerhome() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const navigate=useNavigate()
 

  const Usercarlist = async () => {
    try {
      const res = await carlistuserapi();
      if (res.status === 200) {
        setUser(res?.data);
        console.log(res.data,'ppppppppppppp')
      } else {
        toast.error("loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  useEffect(() => {
    Usercarlist();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Buyernav className="p-0 m-0" />
          <div className="">
            <div
              className="hero h-48 md:h-64 lg:h-96 bg-cover bg-center"
              style={{
                backgroundImage: "url('/src/assets/images/partnerlogin2.jpg')",
              }}
            >
            </div>
          </div>
          <div className="flex items-center w-full md:w-screen h-20 px-4 md:px-36 bg-black from-gray-900 to-gray-700">
            <form method="GET" className="w-full md:w-1/2 lg:w-2/3 mx-auto">
              <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  className="w-full py-2 text-sm bg-gray-900 rounded-md pl-10 focus:bg-white border border-white focus:text-gray-900"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </div>
            </form>

            <div className="md-w-screen dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-gray-900 w-32 md-w-full lg:w-full text-white border border-white rounded-e-none"
              >
                Filter
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>

          {/* car card section */}
          <section className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-4 md:px-10 lg:px-2 bg-black">
              {user.map((data) => (
                <div key={data.id} className="relative h-80 md:h-80">
                <img onClick={()=>{navigate("/buyer/singlepage",{state: { car_id: data.id}})}}
                    className="border-3 w-full h-86 border-gray-800 border-4 rounded-lg transition-transform transform hover:scale-105 active:scale-105"
                    src={data.carimage1}
                    alt="car"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
