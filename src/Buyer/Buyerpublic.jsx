import React from 'react';
import { Navigate } from 'react-router-dom';

function Buyerpublic(props) {
  if (localStorage.getItem('userToken')) {
    return <Navigate to="/buyer/buyerhome" />;
  } else {
    return props.children;
  }
}

export default Buyerpublic;