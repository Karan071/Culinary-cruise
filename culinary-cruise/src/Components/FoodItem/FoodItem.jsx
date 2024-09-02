import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext"

const FoodItem = ({ id, name, price, description, image }) => {
//   const [itemCount,setItemCount] = useState(0) // since we are using useState so we are creating a state for 32 objects : which not an advised practice, because when our application will have more food items // So we'll create cart item in context file (creating all the functionality through context api)
    const { cartItems, addToCart, removeFromCart, url} =  useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className="food-item-image" src={url + "/images/" + image} alt="" />
                {
                !cartItems[id] ? <img className="add" onClick={ () => addToCart(id)} src={assets.add_icon_white} /> 
                : <div className="food-item-counter" >
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.add_icon_green}  />
                </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">₹{price}</p>
            </div>
        </div>
    );
    };

export default FoodItem;
