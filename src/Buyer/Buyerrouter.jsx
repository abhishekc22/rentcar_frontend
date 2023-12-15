import React from 'react'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Buyerhome from './Buyerhome';
import Buyerprofile from './Buyerprofile';
import Buyerprivate from './Buyerprivate';
import Singlepage from './Singlepage';



function Buyerrouter() {
  return (
    <>
    
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/buyerhome'element={<Buyerprivate><Buyerhome/></Buyerprivate>}/>
        <Route path='/profile'element={<Buyerprivate><Buyerprofile/></Buyerprivate>}/>
        <Route path='/singlepage'element={<Buyerprivate><Singlepage/></Buyerprivate>}/>
  
      </Routes>
    </>
    
  )
}

export default Buyerrouter