import React from 'react'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Buyerhome from './Buyerhome';
import Buyerprofile from './Buyerprofile';
import Buyerprivate from './Buyerprivate';
import Singlepage from './Singlepage';
import SelectLocation from './Selectlocation';
import Checkout from './Checkout';
import Google from './Google';
import Payment from './Payment';
import Bookindetails from './Bookindetails';
import Buyerchat from './Buyerchat';
import Chating from './Chating';
import Buyerwallet from './Buyerwallet';
import Buyerpublic from './Buyerpublic';
import Drfault from '../Common/Drfault';




function Buyerrouter() {
  return (
    <>
    
      <Routes>

        <Route path='/login' element={<Buyerpublic><Login/></Buyerpublic>} />


        <Route path='/googlelogin'element={<Google/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/buyerhome'element={<Buyerprivate><Buyerhome/></Buyerprivate>}/>
        <Route path='/profile'element={<Buyerprivate><Buyerprofile/></Buyerprivate>}/>
        <Route path='/singlepage'element={<Buyerprivate><Singlepage/></Buyerprivate>}/>
        <Route path='/buyerlocation'element={<Buyerprivate><SelectLocation/></Buyerprivate>}/>
        <Route path='/checkout'element={<Buyerprivate><Checkout/></Buyerprivate>}/>
        <Route path='/paymentsuccess'element={<Buyerprivate><Payment/></Buyerprivate>}/>
        <Route path='/buyerbooking'element={<Buyerprivate><Bookindetails/></Buyerprivate>}/>
        <Route path='/buyerchat'element={<Buyerprivate><Buyerchat/></Buyerprivate>}/>
        <Route path='/chating' element={<Buyerprivate><Chating/></Buyerprivate>}/>
        <Route path='/wallet'element= {<Buyerprivate><Buyerwallet/></Buyerprivate>}/>
        <Route path='*' element={<Drfault/>} />
      </Routes>
    </>
    
  )
}

export default Buyerrouter