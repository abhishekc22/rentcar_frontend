import React from "react";
import Navbar from "../Dashboard/Navbar";
import Adminsidebar from "../Dashboard/Adminsidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../Main/Loading";
import { adminuserlist } from "../../Api/Adminapi";
import "react-toastify/dist/ReactToastify.css";

function Userlist() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const Userlist = async () => {
    try {
      setLoading(true);
      const res = await adminuserlist();
      if (res.status == 200) {
        setLoading(false);
        setUser(res.data);
      } else {
        toast.error("loading error", { theme: "dark" });
      }
    } catch (error) {
      toast.error("server error");
      setLoading(false);
    }
  };
  useEffect(() => {
    Userlist();
  }, []);
  return (
    <>
      <Navbar />
    {loading?(<Loading/>):(  <div className="flex">
        <Adminsidebar />
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table class="w-full text-sm text-left   dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-white dark:bg-white dark:text-black  border-b dark:border-black">
              <tr>
                <th scope="col" class="px-6 py-3">
                  username
                </th>
                <th scope="col" class="px-6 py-3">
                  email
                </th>
                <th scope="col" class="px-6 py-3">
                  roles
                </th>
                <th scope="col" class="px-6 py-3">
                  verified
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((data) => (
                <tr key={data._id} class="bg-white border-b dark:border-black">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium  whitespace-nowrap dark:text-black"
                  >
                    {data.username}
                  </th>
                  <td class="px-6 py-4 dark:text-black font-medium">
                    {data.email}
                  </td>
                  <td class="px-6 py-4 dark:text-black font-medium">
                    {data.role}
                  </td>
                  <td class="px-6 py-4 dark:text-black font-medium"></td>
                  <td class="px-6 py-4">
                    <button class="bg-white hover:bg-cyan-100 text-black font-bold py-2 border-2 border-black rounded sm:w-full">
                      block/unblock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)}
    </>
  );
}

export default Userlist;
