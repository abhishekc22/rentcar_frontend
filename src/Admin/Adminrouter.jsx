import React from 'react'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Login from './pages/Login'

import Userlist from './pages/Userlist';
import Overviewdashboard from './Dashboard/Overviewdashboard';
import Admindashboard from './pages/Admindashboard';
import Adminprivate from './pages/Adminprivate';
import Carlist from './pages/Carlist';
import Adminibooklist from './pages/Adminibooklist';
import Adminpublic from './pages/Adminpublic';
import Drfault from '../Common/Drfault';


function Adminrouter() {
  return (
    <Routes>
        <Route path='adminlogin' element={<Adminpublic><Login/></Adminpublic>}/>

        #pages in admin
        <Route path ='overview'element={<Adminprivate><Overviewdashboard/></Adminprivate>}/>
        <Route path='userlist'element={<Adminprivate><Userlist/></Adminprivate>}/>
        <Route path='dashboard'element={<Adminprivate><Admindashboard/></Adminprivate>}/>
        <Route path='carlist'element={<Adminprivate><Carlist/></Adminprivate>}/> 
        <Route path='booklist'element={<Adminprivate><Adminibooklist/></Adminprivate>}/>
        <Route path='*' element={<Drfault/>} />
    </Routes>

  )
}

export default Adminrouter