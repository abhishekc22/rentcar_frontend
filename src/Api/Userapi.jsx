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

export const  slectingcarapi=async(pickupdate, returndate, carId,user_id)=>{
    console.log(pickupdate,carId,returndate,user_id,'**************')
    const data= await axios.post('buyerside/booking/', {pickupdate, returndate,carId,user_id});
    console.log(data,'+++++++++++++++++++++++++++++')
    return data
}

export const checkoutapi=async(pickupdate,returndate,total_amount,car_location,buyer_name)=>{
    console.log(pickupdate,car_location,returndate,total_amount,buyer_name,'=============1===============')
    const data= await axios.post('buyerside/payment/', {pickupdate, car_location,returndate,total_amount,buyer_name});
    return data
}


export const boookingapi=async(pickupdate,returndate,total_amount,car_location,buyer_name)=>{
    console.log(pickupdate,car_location,returndate,total_amount,buyer_name,'=============1===============')
    const data= await axios.post('buyerside/bookingpayment/', {pickupdate, car_location,returndate,total_amount,buyer_name});
    return data
}



export const get_bookdetails=async(user_id)=>{
    const data= await axios.get(`buyerside/buyerbooking/${user_id}`)
    console.log(data,'----------------------')
    return data
}


export const geting_partnerapi=async(byer_id)=>{
    console.log(byer_id,'_______________________+++++++++++++')
    const data= await axios.get(`/buyerside/get_partner/${byer_id}`)
    console.log(data,'*******************')
    return data
}
