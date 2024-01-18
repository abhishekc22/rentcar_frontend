import React from 'react';
import { Navigate } from 'react-router-dom';

function Partnerpublic(props) {
  if (localStorage.getItem('partnertoken')) {
    return <Navigate to='/partner/home' />;
  } else {
    return props.children;
  }
}

export default Partnerpublic;