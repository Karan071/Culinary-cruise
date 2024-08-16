import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'wouter'
// import { getTotalCartAmount } from '/src/context/StoreContext.jsx';
import { StoreContext } from '/src/context/StoreContext.jsx';


const Navbar = ({setShowLogin}) => {
    // For the underline dynamic effect :  making the default state as Home
    const [menu,setMenu] = useState("Home"); // Making the Home as default

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
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
                <Link to='/cart'><img src={assets.basket_icon}/></Link>
                <div className={getTotalCartAmount()=== 0 ?"":"dot"}></div>
            </div>
            {!token ?  <button onClick={()=>setShowLogin(true)}>Sign In</button> : <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div> }
           
        </div>
    
    </div>
  )
}

export default Navbar