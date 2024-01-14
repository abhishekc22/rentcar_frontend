import { useFormik } from "formik";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userprofileedit } from "./Validation/Userprofileedit";
import { userprofileeditput, userprofileget } from "../Api/Userapi";
import Loading from "../Main/Loading";
import Buyernav from "./Common/Buyernav";

function Buyerprofile() {
  const [loading, setLoading] = useState(false);

  const user_id = useSelector((state) => state.useReducer.user);
  console.log("======================", user_id);

  const [buyer_image, setBuyer_image] = useState(false);

  const [userdetail, setUserdetail] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: userdetail?.user?.username,
        email: userdetail?.email,
        phone_number: userdetail?.phone_number,
      },
      validationSchema: userprofileedit,
      onSubmit,
      enableReinitialize: true,
    });

  async function onSubmit() {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        console.log(value, "00000070000");
        formData.append(key, value);
      });

      if (buyer_image) {
        formData.append("buyer_image", buyer_image);
      }

      if (user_id) {
        formData.append("user_id ", user_id);
      }

      const res = await userprofileeditput(formData, user_id);
      console.log(formData, "----------------------------");
      if (res?.status === 200) {
        console.log(res.data, "////////////////////////////");
        setBuyer_image(res?.buyer?.buyer_image);
        console.log(buyer_image, "******************");
        toast.success("updated succesfully", { theme: "dark" });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("server error", { theme: "dark" });
      console.log(error, "000085858000");
    }
  }

  const handleimage1 = (e) => {
    try {
      setLoading(true);
      const buyerimage = e.target.files[0];
      setBuyer_image(buyerimage);
      console.log(setBuyer_image, "----------*9*9*9-----------");
      setLoading(false);
    } catch (error) {
      setLoading(true);
      toast.error("server error", { theme: "dark" });
    }
  };

  useEffect(() => {
    setLoading(true);
    userprofileget(user_id)
      .then((response) => {
        setUserdetail(response?.data);
        setLoading(false);

        console.log(response?.data, "858585");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [buyer_image]);

  return (
    <>
      <Buyernav />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div
          className="min-h-screen text-black pt-32"
          style={{
            backgroundImage: "linear-gradient(115deg, #000000, #ffffff)",
          }}
        >
          <div className="container flex">
            <form onSubmit={handleSubmit}>
              <div className="w-full lg:w-10/12 flex flex-col lg:flex-row border-2 bg-black rounded-xl mx-auto shadow-lg overflow-hidden">
                <div className="w-full lg:w-2/4 flex items-center justify-center bg-no-repeat bg-cover bg-center">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img
                      src={`http://localhost:8000${
                        userdetail?.buyer_image ||
                        "src/assets/images/profile.jpg"
                      }`}
                      alt="User Profile"
                    />
                  </label>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleimage1}
                    id="fileInput" // Specify the id for the input element
                    style={{ display: "none" }}
                  />
                  <h1 className="text-black text-3xl mb-3">.</h1>
                </div>
                <div className="w-full lg:w-8/12 py-16 px-4 lg:px-12">
                  <h1 className="text-3xl mb-4  text-white">User Details</h1>
                  <p className="mb-4 text-white"> user information</p>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border border-gray-400 py-1 px-2 w-full"
                      required
                    />
                    {errors.username && touched.username && (
                      <p className="text-red-600">{errors.username}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      placeholder="email"
                      className="border border-gray-400 py-1 px-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="phonenumber"
                      name="phone_number"
                      placeholder="phone_number"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border border-gray-400 py-1 px-2 w-full"
                      required
                    />
                    {errors.phone_number && touched.phone_number && (
                      <p className="text-red-600">{errors.phone_number}</p>
                    )}
                  </div>
                  <div className="mt-8">
                    <button
                      className="w-full plg:w-3/4 bg-gradient-to-r from-white   to-black hover:from-black hover:to-white py-3 text-center border border-black rounded-full"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default Buyerprofile;
