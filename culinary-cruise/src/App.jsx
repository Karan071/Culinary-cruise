import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/Placeorder/Placeorder'

const App = () => {
  return (
    <div className='app'>
     <Navbar/> 
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Placeorder />} />
      </Routes>
         
    </div>
  )
}

export default App