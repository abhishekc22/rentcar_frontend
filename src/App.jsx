
import Buyerrouter from './Buyer/Buyerrouter';
import Home from './Common/Home'
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Partnerrouter from './Partner/Partnerrouter';
import Adminrouter from './Admin/Adminrouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
    <Router>
      <ToastContainer /> 
      <Routes>
        <Route path='/admin/*' element={<Adminrouter/>}/>
        <Route path='/' element={<Home/>} />
        <Route path='/buyer/*' element={<Buyerrouter/>} />
        <Route path='/partner/*' element={<Partnerrouter/>} />
        
      </Routes>
    </Router>
  
    </>
  )
}

export default App
