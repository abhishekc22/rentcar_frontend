import React, { useEffect, useState } from "react";
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
import useGoogleMapApi from "../Map/Map";
import { Autocomplete } from "@react-google-maps/api";

function Addcar() {
  const { isLoaded } = useGoogleMapApi();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [errorlocation, setErrorLocation] = useState("");
  const partner_id = useSelector((state) => state.PartnerReducer.partner);

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
      enginetype: "",
      price: "",
      location: "",
      car_type: "",
      document: null,
      carimage1: null,
      carimage2: null,
    },
    validationSchema: Carvalidation,
    onSubmit,
  });

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

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await Addcarapi(formData, partner_id);
      if (res?.status == 201) {
        toast.success("updated successfully", { theme: "dark" });
        navigate("/partner/home");
      }
    } catch (error) {
      setLoading(false);
      toast.error("server error", { theme: "dark" });
    }
  }

  const formData = new FormData();
  if (location) {
    formData.append("location", location);
  }

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });


  
  const handlePlaceSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("location"),
      {
        componentRestrictions: { country: "IN" },
        types: ["(cities)"],
      }
    ); 

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
        setErrorLocation("");
        setFieldValue("location", place.formatted_address);
      } else {
        setErrorLocation("Invalid location");
      }
    });
  };

  // In your render or useEffect
  useEffect(() => {
    if (isLoaded) {
      handlePlaceSelect();
    }
  }, [isLoaded]);

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
        <div className="flex flex-row lg:flex-row ">
          <Partnersidebar />
          <div className="w-full lg:w-full py-16 px-2 lg:px-12 bg-blue-200">
            <h1 className="text-4xl md:text-5xl mb-6 font-bold px-20">
              Add Car
            </h1>

            <form onSubmit={handleSubmit} className="max-w-md  mx-20">
              <div className="mb-4">
                <h1 className="font-serif text-xl md:text-2xl">Car name</h1>
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
                <h1 className="font-serif text-xl md:text-2xl">Location</h1>
                {isLoaded && (
                  <Autocomplete onLoad={handlePlaceSelect}>
                  <input
                    type="text"
                    placeholder="location"
                    name="location"
                    id="location"
                    value={values.location}
                    {...getFieldProps("location")}
                    className="border border-black py-1 px-2 w-full"
                  />
                  </Autocomplete>
                )}
                {errors.location && touched.location && (
                  <p className="text-red-600">{errors.location}</p>
                )}
              </div>

              <div className="mb-4">
                <h1 className="font-serif text-xl md:text-2xl">Engine type</h1>
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
      )}
    </>
  );
}

export default Addcar;
