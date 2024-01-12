import React, { useEffect, useState } from "react";
import Buyernav from "./Common/Buyernav";
import Loading from "../Main/Loading";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { carlistuserapi } from "../Api/Userapi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGoogleMapApi from "../Map/Map";
import { Autocomplete, Data } from "@react-google-maps/api";

export default function Buyerhome() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { isLoaded } = useGoogleMapApi();
  const navigate = useNavigate();
  console.log(user, "*****************");

  // pagination
  const [currentpage, setCuurentpage] = useState(1);
  const recordpage = 6;
  const last_index = currentpage * recordpage;
  const first_index = last_index - recordpage;
  const records = user.slice(first_index, last_index);
  const npage = Math.ceil(user.length / recordpage); //get  the  number  of   pages
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const Usercarlist = async () => {
    try {
      setLoading(true);
      const res = await carlistuserapi();
      console.log(res, "ttttttttttttyyyyyyyyyyyy888");
      setLoading(false);
      if (res.status === 200) {
        setUser(res?.data);
        console.log(res.data, "ppppppppppppp");
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

  function previospage() {
    if (currentpage !== 1) {
      setCuurentpage(currentpage - 1);
    }
  }

  function nextpage() {
    if (currentpage !== npage) {
      setCuurentpage(currentpage + 1);
    }
  }

  function change_page(id) {
    setCuurentpage(id);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Buyernav className="p-0 m-0" />
          <div className="h-screen">
            <div className="">
              <div
                className="hero h-48 md:h-64 lg:h-96 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/src/assets/images/partnerlogin2.jpg')",
                }}
              ></div>
            </div>
            <div className="flex items-center w-full md:w-screen h-20 px-4 md:px-36 bg-black from-gray-900 to-gray-700">
              <nav className="flex items-center justify-center mt-4">
                <ul className="flex space-x-2">
                  <li>
                    <a
                      onClick={previospage}
                      className="px-3 py-1 rounded-md bg-gray-800 text-white"
                    >
                      Prev
                    </a>
                  </li>

                  {numbers.map((n, i) => (
                    <li
                      className={`page-item ${
                        currentpage === n ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        onClick={() => change_page(n)}
                        className={`px-3 py-1 rounded-md ${
                          currentpage === n
                            ? "bg-blue-500 text-white active"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {n}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      onClick={nextpage}
                      className="px-3 py-1 rounded-md bg-gray-800 text-white"
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 px-4 md:px-10 lg:px-2 h-full bg-black">
                {records.map((data) => (
                  <div
                    key={data.id}
                    className="relative h-full rounded-xl bg-gray-900"
                  >
                    <img
                      onClick={() => {
                        navigate("/buyer/singlepage", {
                          state: { car_id: data.id },
                        });
                      }}
                      className="border-3 w-full mt-2 border-gray-800 border-4 rounded-xl transition-transform transform hover:scale-105 active:scale-105"
                      src={data.carimage1}
                      alt="car"
                    />
                    <div className="text-white text-sm md:text-base lg:text-base w-full p-2 border-t border-gray-800 rounded-b bg-gray-900 absolute bottom-0">
                      <div className="font-bold"> Carname: {data.carname}</div>
                      <div> Price: ${data.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
          
    </>
  );
}
