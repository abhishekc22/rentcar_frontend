import React, { useState } from 'react';
import { useFormik } from 'formik';
import Loading from '../Main/Loading';

function Partnerprofile() {
  const [loading, setLoading] = useState(false);

  // Assuming userdetail is defined somewhere in your component or props
  const userdetail = {
    user: {
      username: 'exampleUsername',
    },
    email: 'example@email.com',
    phone_number: '1234567890',
  };

  const handleimage1 = (event) => {
    // Implement your logic for handling file input
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: userdetail?.user?.username || '',
      email: userdetail?.email || '',
      phone_number: userdetail?.phone_number || '',
    },
    // Implement your validation schema if needed
    onSubmit: (values) => {
      // Implement your logic for form submission
      console.log(values);
    },
  });

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="min-h-screen text-black pt-32" style={{ backgroundImage: "linear-gradient(115deg, #020024, #9e8e76 )" }}>
          <div className="container flex">
            <form onSubmit={handleSubmit}>
              <div className="w-full lg:w-10/12 flex flex-col lg:flex-row bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                <div className="w-full lg:w-2/4 flex items-center justify-center bg-no-repeat bg-cover bg-center">
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <img src='' alt="User Profile" />
                  </label>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleimage1}
                    id="fileInput"
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
                      type="tel" // Use "tel" for phone numbers
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
