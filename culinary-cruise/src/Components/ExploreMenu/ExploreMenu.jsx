import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets';

const ExploreMenu = () => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our wide range of Menu Items</h1>
        <p className='explore-menu-text'>Explore our menu and discover a variety of delicious options to satisfy every craving. From savory dishes to sweet treats, there's something for everyone to enjoy. Start your culinary journey with us today!</p>
        <div className="explore-menu-list">
            {menu_list.map((items,index) => {
                return (
                    <div key={index} className='explore-menu-list-item'>
                        <img src={items.menu_image} alt="" />
                        <p>{items.menu_name}</p>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default ExploreMenu