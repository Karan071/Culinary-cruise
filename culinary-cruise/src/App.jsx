import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Route, Router } from "wouter";
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/Placeorder/Placeorder'

const App = () => {
  return (
    <div className='app'>
     <Navbar/> 
      <Router>
        <Route path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/order" component = {Placeorder} />
      </Router>
         
    </div>
  )
}

export default App



      //  <RouterProvider>
      //   <Route path='/' element={<Home />} />
      //   <Route path='/cart' element={<Cart />} />
      //   <Route path='/order' element={<PlaceOrder />} />
      // </RouterProvider>