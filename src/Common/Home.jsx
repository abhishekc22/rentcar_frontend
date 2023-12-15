import React from 'react'
import Header from '../Main/Header'
import Footer from '../Main/Footer'

function Home() {
  return (
    <>
    <Header/>
 <div className="hero min-h-screen" style={{ backgroundImage: "url('/src/assets/images/logo car.jpg')" }}>
   <div className="hero-overlay bg-opacity-60"></div>
   <div className="hero-content text-center text-neutral-content">
     <div className="max-w-md">
       <h1 className="mb-5 text-5xl font-bold text-blue-250">WELCOME TO CAR WAY</h1>
       <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
     </div>
   </div>
 </div>
 <Footer/>
    </>
  )
}

export default Home