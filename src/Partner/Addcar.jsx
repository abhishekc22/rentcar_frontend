import React, { useState } from 'react';
import Partnernav from "./Common/Partnernav";
import Partnersidebar from "./Common/Partnersidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { Carvalidation } from "./Validation/Addcarvalidation";
import { useSelector } from "react-redux";
import { Addcarapi } from "../Api/Partnerapi";
import { useNavigate } from "react-router-dom";
import Loading from "../Main/Loading";

function Addcar() {
  const [loading, setLoading] = useState(false);
  const partner_id = useSelector((state) => state.PartnerReducer.partner);
  console.log(partner_id, "*********");
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      carname: "",
      location: "",
      enginetype: "",
      price: "",
      car_type: "",
      document: null,
      carimage1: null,
      carimage2: null,
    },
    validationSchema: Carvalidation,
    onSubmit,
  });
  console.log({ ...values }, "************/9/98/89");

  const imagedocument = (e) => {
    const file = e.target.files[0];
    setFieldValue("document", file);
  };

  const carimage1 = (e) => {
    const file = e.target.files[0];
    setFieldValue("carimage1", file);
  };

  const carimage2 = (e) => {
    const file = e.target.files[0];
    setFieldValue("carimage2", file);
  };

  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
    console.log(formData.get("carimage1"), "88888887888888");
  });

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await Addcarapi(formData, partner_id);
      if (res?.status == 201) {
        toast.success("updated succesfully", { theme: "dark" });
        navigate("/partner/home");
      }
    } catch (error) {
      toast.error("server error", { theme: "dark" });
    }
  }

  return (
    <>
      <Partnernav />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="flex">
          <Partnersidebar />
          <div className="w-full">
            <div className="w-full lg:w-2/4 md:w-2/4 py-16 px-4 lg:px-12">
              <h1 className="text-5xl mb-6 from-neutral-100"> Add car</h1>
              <p className="mb-4 text-black text-3xl "> Car information</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h1 className=" font-serif text-2xl">Car name</h1>
                  <input
                    type="text"
                    placeholder="carname"
                    name="carname"
                    id="name"
                    {...getFieldProps("carname")}
                    className="border border-black py-1 px-2 w-full"
                  />
                  {errors.carname && touched.carname && (
                    <p className="text-red-600">{errors.carname}</p>
                  )}
                </div>
                <div className="mb-4">
                  <h1 className=" font-serif text-2xl"> location</h1>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="carlocation"
                    {...getFieldProps("location")}
                    className="border border-black py-1 px-2 w-full"
                  />
                  {errors.location && touched.location && (
                    <p className="text-red-600">{errors.location}</p>
                  )}
                </div>
                <div className="mb-4">
                  <h1 className="font-serif text-2xl">Engine type</h1>
                  <select
                    id="enginetype"
                    name="enginetype"
                    {...getFieldProps("enginetype")}
                    className="border border-gray-400 py-1 px-2 w-full"
                    required
                  >
                    <option value="" disabled selected>
                      Select category
                    </option>
                    <option value="electric">Electric</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                  </select>
                </div>
                <div className="mb-4">
                  <h1 className="font-serif text-2xl">Car price/day</h1>
                  <input
                    type="number"
                    placeholder="price"
                    name="price"
                    {...getFieldProps("price")}
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-600">{errors.price}</p>
                  )}
                </div>
                <div className="mb-4">
                  <h1 className="font-serif text-2xl">Type</h1>
                  <select
                    id="car_type"
                    name="car_type"
                    {...getFieldProps("car_type")}
                    className="border border-gray-400 py-1 px-2 w-full"
                    required
                  >
                    <option value="" disabled selected>
                      Select category
                    </option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                    <option value="tesla">Tesla</option>
                  </select>
                </div>
                <div className="mb-4">
                  <h1 className="font-serif text-2xl">Car document</h1>
                  <input
                    type="file"
                    id="document"
                    name="document"
                    onChange={imagedocument}
                    accept="image/*"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  {errors.document && touched.document && (
                    <p className="text-red-600">{errors.document}</p>
                  )}
                </div>

                <div className="mb-4">
                  <h1 className="font-serif text-2xl">Image 1</h1>
                  <input
                    type="file"
                    id="image1"
                    name="carimage1"
                    onChange={carimage1}
                    accept="image/*"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  {errors.carimage1 && touched.carimage1 && (
                    <p className="text-red-600">{errors.carimage1}</p>
                  )}
                </div>

                <div className="mb-4">
                  <h1 className="font-serif text-2xl">Image 2</h1>
                  <input
                    type="file"
                    id="image2"
                    accept="image/*"
                    name="carimage2"
                    onChange={carimage2}
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  {errors.carimage2 && touched.carimage2 && (
                    <p className="text-red-600">{errors.carimage2}</p>
                  )}
                </div>

                <div className="mt-8">
                  <button
                    className="w-full plg:w-3/4 bg-gradient-to-r from-black via-purple-500 to-black hover:from-white hover:to-black py-3 text-center border border-black rounded-full"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Addcar;
