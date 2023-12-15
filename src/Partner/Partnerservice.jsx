import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faList, faBook } from '@fortawesome/free-solid-svg-icons';
import Partnernav from './Common/Partnernav';
import { Link } from 'react-router-dom';

function Partnerservice() {
  return (
    <>
      <Partnernav />

      <div className='w-2/4 h-screen md:w-1/5 lg:w-1/5 bg-black text-white'>
        <div className='px-4 md:px-10 py-2 md:py-11'>
          <p className='inline-block text-2xl md:text-2xl lg:text-2xl'><FontAwesomeIcon icon={faHome} />Dashboard</p>
        </div>
        <div className='px-4 md:px-10 py-4 md:py-11'>
          <p className='inline-block text-2xl md:text-3xl lg:text-2xl'><Link to='/partner/addcar'><FontAwesomeIcon icon={faCar}/>Add Car</Link></p>
        </div>
        <div className='px-4 md:px-10 py-4 md:py-11'>
          
          <p className='inline-block text-2xl md:text-3xl lg:text-2xl'><FontAwesomeIcon icon={faList} />Car List</p>
        </div>
        <div className='px-4 md:px-10 py-4 md:py-11'>
          <p className='inline-block text-2xl md:text-3xl lg:text-2xl'>  <FontAwesomeIcon icon={faBook} />Booking List</p>
        </div>
      </div>
    </>
  );
}

export default Partnerservice;

