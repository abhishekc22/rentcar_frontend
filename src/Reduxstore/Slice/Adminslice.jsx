import { createSlice } from "@reduxjs/toolkit";


const adminSlice=createSlice({
    name:'admin',
    initialState:{
        admin:null,
        token:''
    },
    reducers:{
        adminlogin:(state,action)=>{
            state.admin=action.payload.admin
            state.token=action.payload.token
        },
        adminlogout:(state,action)=>{
            state.admin=null
            state.token=''
        }
    }
})
export  const {adminlogin,adminlogout}=adminSlice.actions
export default  adminSlice.reducer