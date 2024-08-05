import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});

    //function for adding to cart
    const addToCart = (itemId) => {
        //if the item is added for the first time 
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }else{
            //here we are increasing the item number : if already added in the cart
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        // will decrease the value of item by 1
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
    }

    //useEffect 
    useEffect(() =>{
        console.log(cartItems);// we'll store the t cart item states
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        setCartItems,
        removeFromCart

    }

    return ( 
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;