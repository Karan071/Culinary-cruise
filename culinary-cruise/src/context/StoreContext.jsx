import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";//for testing the static arrays

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  const url = "http://localhost:3000";
  const [token, setToken] = useState(""); //saving the token
  //function for adding to cart
  const addToCart = async (itemId) => {
    //if the item is added for the first time
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      //here we are increasing the item number : if already added in the cart
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    // will decrease the value of item by 1
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };



  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = food_list.find((product) => product._id === items); // cartitem is object // for in loop
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return totalAmount;
  };

  //getting the food -items from MongoDB
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  //after refreshing the data is being cleared, so we'll make it still
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  //for saving the token in the brower : so it wont get deleted after refreshing the page
  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
