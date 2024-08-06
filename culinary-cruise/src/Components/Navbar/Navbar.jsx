import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'wouter'


const Navbar = ({setShowLogin}) => {
    // For the underline dynamic effect :  making the default state as Home
    const [menu,setMenu] = useState("Home"); // Making the Home as default

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            {/* //for the dynamic effect / */}
            <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active":""}>Home</Link>
            <a href='#expore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active":""}>Menu</a>
            <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active": ""}>Mobile-App</a>
            <a href='#footer' onClick={() => setMenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt=""  />
                <div className="dot"></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign In</button>
        </div>
    
    </div>
  )
}

export default Navbar