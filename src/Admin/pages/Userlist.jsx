import React, { useEffect, useState } from "react";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import { toast } from "react-toastify";
import Loading from "../../Main/Loading";
import { adminuserlist, blockUnblockUser } from "../../Api/Adminapi";
import "react-toastify/dist/ReactToastify.css";

function Userlist() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const Userlist = async () => {
    try {
      setLoading(true);
      const res = await adminuserlist();
      if (res.status === 200) {
        setLoading(false);
        setUser(res.data);
        console.log(res.data, "------2----");
      } else {
        toast.error("Loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Server error");
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (id) => {
    console.log(id, "----1--------");
    try {
      const res = await blockUnblockUser(id); // Replace with your actual API function and endpoint
      if (res.status === 200) {
        toast.success("User blocked/unblocked successfully", { theme: "dark" });

        Userlist();
      } else {
        toast.error("Action failed", { theme: "dark" });
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    Userlist();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex">
          <Adminsidebar />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg  px-2 py-2 w-full">
            <section className="bg-white dark:bg-gray-900">
              <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-black capitalize lg:text-4xl dark:text-white">
                  User List
                </h1>

                <div className="w-full overflow-x-auto">
                  <table
                    className="w-full text-left border border-separate rounded border-slate-200"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="h-12 px-6 text-sm font-medium text-center border-l first:border-l-0 stroke-slate-700 text-black bg-slate-100"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-black bg-slate-100"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-black bg-slate-100"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-black bg-slate-100"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-black bg-slate-100"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((data, index) => (
                        <tr
                          key={data._id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } border-t border-l first:border-l-0 border-slate-200 transition duration-300`}
                        >
                          <td className="h-12 px-6 text-sm text-center stroke-slate-500 text-slate-500">
                            {index + 1}
                          </td>
                          <td className="h-12 px-6 text-sm transition duration-300 border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                            {data.username}
                          </td>
                          <td className="h-12 px-6 text-sm transition duration-300 border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                            {data.email}
                          </td>
                          <td className="h-12 px-6 text-sm transition duration-300 border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                            {data.role === "partner" ? (
                              <i className="fas fa-star text-yellow-500 mr-2"></i>
                            ) : (
                              <i className="fas fa-user text-blue-500 mr-2"></i>
                            )}
                            {data.role}
                          </td>
                          <td className="h-12 px-6 text-sm transition duration-300 border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                            <button
                              className={`${
                                data.is_blocked
                                  ? "bg-red-500 text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline-indigo active:bg-red-800"
                                  : "bg-green-500 text-white font-bold py-2 px-4 border rounded focus:outline-none focus:shadow-outline-indigo active:bg-green-800"
                              }`}
                              onClick={() => handleBlockUnblock(data.id)}
                            >
                              {data.is_blocked ? "Unblock" : "Block"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
export default Userlist;
