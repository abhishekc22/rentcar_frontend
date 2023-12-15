import React from 'react'
import { Navigate } from "react-router-dom";

function Buyerprivate(props) {
    if (localStorage.getItem('userToken')){
        return props.children;
    }else{
         return <Navigate to='/'/>
    }
  
}

export default Buyerprivate