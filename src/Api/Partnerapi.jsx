import { Await } from "react-router-dom";
import axios from "./Axiosinstance";


export const partnerSignupapi=async(partnersignupdata)=>{
    const data=await axios.post('/api/partner-signup/',partnersignupdata);
    console.log(data,"return backedn")
    return data 
}



export const partnerloginapi=async(parnerlogindata)=>{
    console.log('klooo');
    const data=await axios.post('/api/Partnerlogin-api/',parnerlogindata)
    console.log(data,'data');
    return data
}

export const Addcarapi = async (formData, partner_id) => {
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1],'--------------');
        }

    const data = await axios.post(`partnerside/addcar/${partner_id}/`, formData);
    console.log(data,'*******7474*****')
    return data;


}

export const partnerprofileget=async(partner_id)=>{
    console.log(partner_id,'====================')
    const data= await  axios. get(`partnerside/partner_get/${partner_id}`)
    return data;
}


export const partnerprofileput = async (formData, partner_id) => {   
    for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1],'--------------');
    }
    const data= await axios.put(`partnerside/partner_get/${partner_id}/`,formData);
    return data ;
}

export const partner_carapi = async (partner_id)=>{
    console.log(partner_id,'------18------')
    const  data =   await axios.get(`partnerside/partnercar/${partner_id}`)
    console.log(data,'---------------------------20')
    return data ;
}

export const partner_bookingapi=async(partner_id)=>{
    console.log(partner_id,'=================================')
    const data= await axios.get(`partnerside/partnerbookings/${partner_id}`)
    console.log(data,'===============*============')
    return data
}


export const getbuyer_api=async(partnerid)=>{
    console.log(partnerid,'+++++++++++++++')
    const data= await axios.get(`partnerside/buyerget/${partnerid}`)
    console.log(data,'*************')
    return data
}