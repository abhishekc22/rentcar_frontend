import React from 'react'
import { Navigate } from 'react-router-dom'


function Adminpublic(props) {
    if(localStorage.getItem('adminToken')){
      return  <Navigate to='/admin/overview'/>
    }else{
     return props.children;
    }
}

export default Adminpublic;