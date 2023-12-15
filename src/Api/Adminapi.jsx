import axios from "./Axiosinstance";


export const adminloginapi=async(adminlogindata)=>{
    console.log('kloooooo');
    const data=await axios.post('/api/adminlogin-api/',adminlogindata)
    console.log(data);
    return data
}

export const adminuserlist=async()=>{
    const data=await axios.get('/adminside/adminuserlist/')
    return data
}

export const carlist = async () => {
   const data = await axios.get('/adminside/carlist/');
   console.log(data,'88888888888')
   return data;

  };

export const verify = async (carid) => {
    console.log(carid,'99999999999999')
   const data = await axios.put(`/adminside/Carblock/${carid}/`);
    return data;
}