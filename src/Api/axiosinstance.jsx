import axios from 'axios'
import { jwtDecode } from "jwt-decode";


const baseURL  = import.meta.env.VITE_APP_BASE_URL

console.log("baseUrl", baseURL)


const axiosInstance = axios.create({
    baseURL,
})
 

axiosInstance.interceptors.request.use(
    (config)=>{
        const partnerToken = localStorage.getItem('partnertoken');
        const adminToken = localStorage.getItem('adminToken');
        const userToken = localStorage.getItem('userToken');
    
        // Include the appropriate token based on priority
        if (partnerToken) {
            console.log(partnerToken,'>>>>>>>>>>>>>>>>')
          config.headers.Authorization = `Bearer ${partnerToken}`;
        } else if (adminToken) {
            console.log(adminToken,'>>>>>>>>>>>>>>>>')
          config.headers.Authorization = `Bearer ${adminToken}`;
        } else if (userToken) {
            console.log(userToken,'>>>>>>>>>>>>>>>>')
          config.headers.Authorization = `Bearer ${userToken}`;
        }
    
        return config;
      },
        
    (error)=>{
        return Promise.reject(error)
    }
)
export default axiosInstance 