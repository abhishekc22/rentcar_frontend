import axios from "./axiosinstance";

export const adminloginapi = async (adminlogindata) => {
  console.log("kloooooo");
  const data = await axios.post("/api/adminlogin-api/", adminlogindata);
  console.log(data);
  return data;
};

export const adminuserlist = async (params) => {
  const data = await axios.get("/adminside/adminuserlist/", { params });
  return data;
};

export const carlist = async (params) => {
  const data = await axios.get("/adminside/carlist/", { params });
  console.log(data, "88888888888");
  return data;
};

export const bookinglist_api = async (params) => {
  const data = await axios.get("/adminside/booklist/", { params });
  console.log(data, "------88-------");
  return data;
};

export const verify = async (carid) => {
  console.log(carid, "99999999999999");
  const data = await axios.put(`/adminside/Carblock/${carid}/`);
  return data;
};

export const cardetailsapi = async (carId) => {
  console.log(carId, "++++++++++++++++++");
  const data = await axios.get(`/adminside/cardetails/${carId}`);
  console.log(data, "------------------");
  return data;
};

export const blockUnblockUser = async (id) => {
  console.log(id, "=============");
  const data = await axios.put(`/adminside/userblock/${id}/`);
  return data;
};

export const adminwallet_inf0 = async (id) => {
  console.log(id, "++++++++++++++++++++");
  const data = await axios.get(`adminside/admindash/${id}`);
  console.log(data);
  return data;
};
