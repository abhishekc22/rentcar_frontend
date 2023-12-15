import React from 'react'
import Navbar from './Navbar'
import Admindashboard from '../pages/Admindashboard'
import Adminsidebar from './Adminsidebar'

function Overviewdashboard() {
  return (
    <>
    <Navbar/>
    <div className='flex'>
    <Adminsidebar/>
    </div>
    </>
    
  )
}

export default Overviewdashboard