import React from 'react'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import PartnerLogin from './PartnerLogin';
import Partnersignup from './Partnersignup';
import Partnerhome from './Partnerhome';
import Partnerprivate from './Partnerprivate';
import Addcar from './Addcar';
import Partnerservice from './Partnerservice';
import Partnerprofile from './Partnerprofile';
import Partnercarlist from './Partnercarlist';
import Partnerbooking from './Partnerbooking';
import Partnersidebar from './Common/Partnersidebar';
import Partnerchat from './Partnerchat';
import Chatingpartner from './Chatingpartner';
import Dashboard from './Common/Dashboard';
import Partnerchart from './Common/Partnerchart';
import Partnerpublic from './Partnerpublic';


function Partnerrouter() {
  return (
    <Routes>
    <Route path='login' element={<Partnerpublic><PartnerLogin/></Partnerpublic>} />



    <Route path='signup' element={<Partnersignup/>}/>
    <Route path='addcar' element={<Partnerprivate><Addcar/></Partnerprivate>}/>
    <Route path='service' element={<Partnerprivate><Partnerservice/></Partnerprivate>}/>
    <Route path='home' element={<Partnerprivate><Partnerhome/></Partnerprivate>}/>
    <Route path='profile'element={<Partnerprivate><Partnerprofile/></Partnerprivate>}/>
    <Route path='carlist'element={<Partnerprivate><Partnercarlist/></Partnerprivate>}/>
    <Route path='booking'element={<Partnerprivate><Partnerbooking/></Partnerprivate>}/>
    <Route path='sidebar'element={<Partnerprivate><Partnersidebar/></Partnerprivate>}/>
    <Route path='partnerchat'element={<Partnerprivate><Partnerchat/></Partnerprivate>}/>
    <Route path='chating'element={<Partnerprivate><Chatingpartner/></Partnerprivate>}/>
    <Route path='dashboard'element={<Partnerprivate><Dashboard/></Partnerprivate>}/>
    <Route path='chart'element={<Partnerprivate><Partnerchart/></Partnerprivate>}/>

  </Routes>
  )
}

export default Partnerrouter