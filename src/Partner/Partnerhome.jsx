import React from 'react'
import Partnernav from './Common/Partnernav'
import { useSelector } from "react-redux";
import Loading from "../Main/Loading";
import { useState } from 'react';


function Partnerhome() {
  const [loading, setLoading] = useState(false);
  const partner_id=useSelector((state)=>state.PartnerReducer.partner)

  return (
    <div>
    <Partnernav/>
    {loading ? (
        <Loading />
      ) : (
    <div
          className="hero h-full md:h-64 lg:h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(https://res.cloudinary.com/dhbzojgfp/image/upload/v1705763716/userhome1_rqmzro.jpg)" }}
        >
    </div>)}

  </div>
  )
}

export default Partnerhome