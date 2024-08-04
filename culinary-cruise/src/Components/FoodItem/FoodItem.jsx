import React, { useState } from "react";
import './FoodItem.css';
import { assets } from "../../assets/assets";

const FoodItem = ({ id, name, price, description, image }) => {

  const [itemCount,setItemCount] = useState(0) // since we are using useState so we are creating a state for 32 objects : which not an advised practice, because when our application will have more food items // So we'll create cart item in context

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {
          !itemCount 
          ? 
          <img className="add" onClick={() => setItemCount(x => x + 1)} src = {assets.add_icon_white}/>
          : <div className="food-item-counter">
              <img onClick={() => setItemCount(x => x - 1)} src={assets.remove_icon_red}/>
                <p>{itemCount}</p>
              <img onClick={() => setItemCount(x => x + 1)} src={assets.add_icon_green} />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
