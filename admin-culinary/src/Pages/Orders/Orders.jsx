import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from "axios"
import { assets } from '../../assets/assets';

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if(response.data.success){
        setOrders(response.data.data);
        console.log(response.data.data)
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network error");
    }
  }

  const statusHandler = async(event,orderId) => {
    // console.log(event,orderId)
    const response = await axios.post(url + '/api/order/status' , {
      orderId,
      status : event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  } 

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>    
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item.name} x {item.quantity}
                        {idx !== order.items.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city}</p>
                <p>{order.address.state + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode }</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>₹ {order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>  
    </div>
  )
}

export default Orders;