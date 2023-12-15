import {createSlice} from "@reduxjs/toolkit"

const userslice=createSlice({
    name:"user",
    initialState:{
        token:"",
        user:null
    },
    reducers:{
        userlogin:(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
        },
        userLogout:(state) => {
            state.user = null
            state.token = ""
          }


    }
})
export const {userlogin,userLogout}=userslice.actions
export default userslice.reducer