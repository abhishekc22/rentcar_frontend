import { Await } from "react-router-dom";
import axios from "./Axiosinstance";

export const userSignupApi = async (signupdata) =>{
    console.log(signupdata); 
    const data = await axios.post('/api/Buyer-signup/',signupdata);
    console.log(data,"dataa");
    return data
}
export const userloginapi=async(logindata,)=>{
    const data=await axios.post('/api/Buyerlogin-api/',logindata)
    return data    
}
export const  googleapi=async (d )=>{
    const data=await axios.post('/api/buyer_google/',d)
    console.log(data,'---------------------------------------------')
    return data
}




export const userprofileeditput = async (formData,id) => {
        for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1],'--------------');
        }

        const data = await axios.put(`buyerside/buyerprofile_edit/${id}/`, formData);
        return data;

}

export  const userprofileget=async(userid)=>{
    const data=await axios.get(`buyerside/buyerprofile_edit/${userid}`)
    return data
}

export  const carlistuserapi=async ()=>{
    const data= await axios.get('buyerside/user_carlist/')
    return data
}

export const singlepageapi=async(carId)=>{
    console.log(carId,'888888888')
    const data= await axios.get(`buyerside/singlepage/${carId}`)
    return data
}

export const  slectingcarapi=async(pickupdate, returndate, carId)=>{
    console.log(pickupdate,carId,'**************')
    const data= await axios.post('buyerside/booking/', {pickupdate, returndate,carId});
    return data
}
