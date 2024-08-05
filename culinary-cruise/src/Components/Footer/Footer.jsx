import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {

    //for making a footer year dynamic
    const getCurrentYear = () => {
        return new Date().getFullYear();
      };

  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className='footer-content-left'>
                <img src={assets.logo} alt="" />
                <p>Culinary Cruise is a premier food delivery app bringing gourmet meals from top restaurants straight to your doorstep, ensuring a delightful and convenient dining experience every time.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="icons" />
                    <img src={assets.twitter_icon} alt="icons" />
                    <img src={assets.linkedin_icon} alt="icons" />
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch with Us</h2>
                <ul>
                    <li>+91 95822-00000</li>
                    <li>contact@culinaryCruise.ocm</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. {getCurrentYear()} © Culinary Cruise™ Ltd. All rights reserved.
        </p>
    </div>
  )
}

export default Footer