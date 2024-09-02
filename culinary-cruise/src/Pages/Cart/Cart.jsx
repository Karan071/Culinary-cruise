import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../Components/context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();

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
        {food_list.map((item, index) => {
          //this logic : when we'll add the items to the cart, it will show here
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  {/* // this will show quatity of the items selected */}
                  {/* <p>{console.log(cartItems[item._id])}</p> */}
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  {/* to get the price we'll be multiplying Quantity x price */}
                  <p onClick={() => removeFromCart(item._id)}className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>  
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p> ₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 10 }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()  + 10}</b>
            </div>
          </div>
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Got a promo code? Enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text " placeholder="Promo-code" />
              <button >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart