import {createSlice} from "@reduxjs/toolkit"

const partnerSlice = createSlice({
  name:"partner",
  initialState:{
    token:"",
    partner:null,
    partnername:null,
  },
  reducers:{
    partnerLogin:(state,action) => {
      state.token = action.payload.token
      state.partner = action.payload.partner
      state.partnername=action.payload.partnername
    },
    partnerLogout:(state) => {
      state.partner = {
        token:"",
        partner:null,
        partnername:null,
      }
    }
  }
})
export const {partnerLogin,partnerLogout} = partnerSlice.actions
export default partnerSlice.reducer