import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Loading from "../Main/Loading";
import { partnerprofieedit } from "./Validation/Partneredit";
import { useSelector } from "react-redux";
import { partnerprofileget } from "../Api/Partnerapi";
import Partnernav from "./Common/Partnernav";
import { partnerprofileput } from "../Api/Partnerapi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Partnerprofile() {
  const partner_id = useSelector((state) => state.PartnerReducer.partner);
  console.log(partner_id, "*************");

  const [loading, setLoading] = useState(false);
  const [profiledata, setprofiledata] = useState("");
  const [partner_image, setPartner_image] = useState(false);
  const [render,setRender] = useState(false)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: profiledata?.user?.username,
        email: profiledata?.email,
        phone_number: profiledata?.phone_number,
      },
      validationSchema: partnerprofieedit,
      onSubmit,
      enableReinitialize: true,
    });
  async function onSubmit() {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        console.log(value, "00000070000");
        formData.append(key, value);
        console.log(value, "88888888");
      });
      if (partner_image) {
        formData.append("partner_image ", partner_image);
      }

      if (partner_id) {
        formData.append("partner_id ", partner_id);
      }
      console.log(formData, "-------------->>>>");
      const res = await partnerprofileput(formData, partner_id);
      if (res?.status === 201) {
        if(render===true){
          setRender(false)
        }else{
          setRender(true)

        }
        
        console.log(res.data, ".....................");
        toast.success("updated succesfully", { theme: "dark" });
      } else {
        toast.success("not completed", { theme: "dark" });
      }
    } catch (errors) {
      toast.error("server error", { theme: "dark" });
    }
  }

  useEffect(() => {
    setLoading(true);
    partnerprofileget(partner_id)
      .then((response) => {
        setprofiledata(response?.data);
        setLoading(false);
        console.log(response?.data, "------852--------");
        console.log(profiledata?.email, "00000000000000000000");
  
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [render]);



  const handleimage = (e) => {
    try{
      const partner_image = e.target.files[0];
      console.log(partner_image,'==================ewew')
      setPartner_image(partner_image);
      console.log(partner_image, "22222222222222222");
  }catch{
    toast.error("photo is not updated", { theme: "dark" });
  }
  };

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
        <div
          className="min-h-screen text-black pt-32"
          style={{
            backgroundImage: "linear-gradient(115deg, #020024, #9e8e76 )",
          }}
        >
          <div className="container flex">
            <form onSubmit={handleSubmit}>
              <div className="w-full lg:w-10/12 flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                <div className="w-full lg:w-2/4 flex items-center justify-center bg-no-repeat bg-cover bg-center">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img
                      src={`http://localhost:8000/${
                        profiledata?.partner_image ||
                        "/src/assets/images/profile.jpg"
                      }`}
                      alt="User Profile"
                    />
                  </label>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    id="fileInput"
                    onChange={handleimage}
                    style={{ display: "none" }}
                  />
                  <h1 className="text-white text-3xl mb-3">.</h1>
                </div>
                <div className="w-full lg:w-8/12 py-16 px-4 lg:px-12">
                  <h1 className="text-3xl mb-4">User Details</h1>
                  <p className="mb-4 text-black">user information</p>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
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
                      type="tel"
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
                      className="w-full lg:w-3/4 bg-gradient-to-r from-black via-purple-500 to-black hover:from-white hover:to-black py-3 text-center border border-black rounded-full"
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
export default Partnerprofile;
