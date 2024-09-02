import React, { useCallback, useContext, useState } from 'react'
import {assets} from "../../assets/assets"
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home") 
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);    

    const navigate = useNavigate();

    //just reomve token from local storage
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");//redirect to home page
    }
    return (
    <div className='navbar'>
        <Link to="/"><img src = {assets.logo} alt="logo" className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick= {() => { setMenu("home")}}className={menu === "home"  ? "active" : "" }>Home</Link>
            <a href='#explore-menu' onClick= {() => { setMenu("menu")}}className={menu === "menu" ? "active" : ""}>Menu</a>
            <a href='#app-download' onClick= {() => { setMenu("mobile-app")}}className={menu === "mobile-app"  ? "active" : "" }>Mobile-app</a>
            <a href='#footer' onClick= {() => { setMenu("contact-us")}}className={menu === "contact-us"  ? "active" : "" }>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to="/cart"> <img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount() === 0  ? "":"dot"}></div>
            </div>
                {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
            ) : (
            <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                <li>
                    <img onClick= {() => navigate('/myorders')}src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                </li>
                <hr />
                <li>
                    <img onClick = {logout} src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                </li>
                </ul>
            </div>
            )}
        </div>
    </div>
    ) 
}

export default Navbar