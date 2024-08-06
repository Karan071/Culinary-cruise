import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Route, Router } from "wouter";
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeorder from './Pages/Placeorder/Placeorder'
import Footer from './Components/Footer/Footer';
import LoginPopup from './Components/LoginPopUp/LoginPopup';

const App = () => {
  //state variable for popup login
  const [showLogin, setShowLogin] = useState(false);


  return (
    <>
    {showLogin ? <LoginPopup setShowLogin = {setShowLogin}/> : <></> }
    <div className='app'>
     <Navbar setShowLogin={setShowLogin}/> 
      <Router>
        <Route path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/order" component = {Placeorder} />
      </Router>
    </div>
    <Footer/>
    </>
  )
}

export default App


