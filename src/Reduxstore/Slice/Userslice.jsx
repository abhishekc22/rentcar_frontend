import {createSlice} from "@reduxjs/toolkit"

const userslice=createSlice({
    name:"user",
    initialState:{
        token:"",
        user:null,
        buyername:null,
    },
    reducers:{
        userlogin:(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
            state.buyername=action.payload.buyername
        },
        userLogout:(state) => {
            state.user = null
            state.token = ""
            state.buyername=null
          }


    }
})
export const {userlogin,userLogout}=userslice.actions
export default userslice.reducer