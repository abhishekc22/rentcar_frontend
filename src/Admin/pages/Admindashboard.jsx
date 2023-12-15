import React from 'react'
import Navbar from '../Dashboard/Navbar'
import Adminsidebar from '../Dashboard/Adminsidebar'

function Admindashboard() {
  return (
    <>
    <Navbar/>
    <div className='flex'>
      <Adminsidebar/>
      <div> dash board</div>
     </div> 
    </>
  )
}

export default Admindashboard