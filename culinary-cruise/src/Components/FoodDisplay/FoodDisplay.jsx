import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                //We'll profile the filter the items acc to categories
                if(category === "All" || category === item.category){ // if the category is All -> it'll display all the food items and if we specify some category it'll return the specific category of food
                return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>)
            }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay