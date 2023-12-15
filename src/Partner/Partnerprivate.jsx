import React from 'react'
import { Navigate } from 'react-router-dom';

function Partnerprivate(props) {
    if(localStorage.getItem('partnertoken')){
      return props.children;
    }else{
       return <Navigate to='/'/>
    }
}

export default Partnerprivate