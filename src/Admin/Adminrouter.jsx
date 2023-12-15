import React from 'react'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Login from './pages/Login'

import Userlist from './pages/Userlist';
import Overviewdashboard from './Dashboard/Overviewdashboard';
import Admindashboard from './pages/Admindashboard';
import Adminprivate from './pages/Adminprivate';
import Carlist from './pages/Carlist';


function Adminrouter() {
  return (
    <Routes>
        <Route path='adminlogin' element={<Login/>}/>

        #pages in admin
        <Route path ='overview'element={<Adminprivate><Overviewdashboard/></Adminprivate>}/>
        <Route path='userlist'element={<Adminprivate><Userlist/></Adminprivate>}/>
        <Route path='dashboard'element={<Adminprivate><Admindashboard/></Adminprivate>}/>
        <Route path='carlist'element={<Adminprivate><Carlist/></Adminprivate>}/> 
    </Routes>

  )
}

export default Adminrouter