import React, { useState } from 'react'
import './Navbar.css'
// import '../../assets/assets'
import { assets } from '../../assets/assets'

const Navbar = () => {
    // Fot the underline dynamic effect :  making the default state as Home
    const [menu,setMenu] = useState("Home");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <li>Home</li>
            <li>Menu</li>
            <li>Mobile-App</li>
            <li>Contact Us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt=""  />
                <div className="dot"></div>
            </div>
            <button>Sign In</button>
        </div>
    
    </div>
  )
}

export default Navbar