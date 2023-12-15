import React from 'react'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import PartnerLogin from './PartnerLogin';
import Partnersignup from './Partnersignup';
import Partnerhome from './Partnerhome';
import Partnerprivate from './Partnerprivate';
import Addcar from './Addcar';
import Partnerservice from './Partnerservice';
import Partnerprofile from './Partnerprofile';

function Partnerrouter() {
  return (
    <Routes>
    <Route path='login' element={<PartnerLogin/>} />
    <Route path='signup' element={<Partnersignup/>}/>
    <Route path='addcar' element={<Partnerprivate><Addcar/></Partnerprivate>}/>
    <Route path='service' element={<Partnerprivate><Partnerservice/></Partnerprivate>}/>
    <Route path='home' element={<Partnerprivate><Partnerhome/></Partnerprivate>}/>
    <Route path='profile'element={<Partnerprivate><Partnerprofile/></Partnerprivate>}/>
  </Routes>
  )
}

export default Partnerrouter