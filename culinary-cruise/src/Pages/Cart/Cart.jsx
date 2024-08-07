import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from "../../context/StoreContext"

const Cart = () => {
  // adding the cart functionality
  const {food_list,cartItems,addToCart,setCartItems,removeFromCart} = useContext(StoreContext);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index) => {
          //this logic : when we'll add the items to the cart, it will show here
            if(cartItems[item._id] > 0){
              return(
                <div className="cart-items-title cart-items">
                  <img src={item.image} />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  {/* // this will show quatity of the items selected */}
                  <p>{cartItems[item._id]}</p> 
                  <p>{console.log(cartItems[item._id])}</p>
                  {/* to get the price we'll be multiplying Quantity x price */}
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <p>x</p>
                </div>
              )
            }
        })
        }
      </div>

    </div>
  )
}

export default Cart