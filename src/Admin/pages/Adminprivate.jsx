import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminprivate(props) {
    if(localStorage.getItem('adminToken')){
      return props.children;
  }else{
     return <Navigate to='/admin/adminlogin'/>
  }
}

export default Adminprivate;