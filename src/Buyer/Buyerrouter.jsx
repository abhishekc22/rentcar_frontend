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



function Buyerrouter() {
  return (
    <>
    
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/googlelogin'element={<Google/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/buyerhome'element={<Buyerprivate><Buyerhome/></Buyerprivate>}/>
        <Route path='/profile'element={<Buyerprivate><Buyerprofile/></Buyerprivate>}/>
        <Route path='/singlepage'element={<Buyerprivate><Singlepage/></Buyerprivate>}/>
        <Route path='/buyerlocation'element={<Buyerprivate><SelectLocation/></Buyerprivate>}/>
        <Route path='/checkout'element={<Buyerprivate><Checkout/></Buyerprivate>}/>

  
      </Routes>
    </>
    
  )
}

export default Buyerrouter