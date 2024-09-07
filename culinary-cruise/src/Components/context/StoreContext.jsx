import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../../assets/assets"; static data for testing : not required// we'll take the data from DB

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    //now the testing part is over, so we want the data to come form DB directly
    const [food_list,setFoodList] = useState([])


    const [cartItems,setCartItems] = useState({});
    const url = "https://culinary-cruise-brach.onrender.com"

    const [token,setToken] = useState("");

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers : {token}})
        setCartItems(response.data.cartData)
    }

    // for preventing the token after refresh
    useEffect(()=> {
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])
    // useEffect(() => {
    //     async function loadData(){
    //         await fetchFoodList();
    //         if(localStorage.getItem("token")){
    //             setToken(localStorage.getItem("token"))
    //             await loadCartData(localStorage.getItem("token"))
    //         }
    //     }
    //     loadData()
    // }, [token]); // <-- add token here if you want to refetch when token changes
    
        
    // function for adding to cart
        const addToCart = async (itemId) => {
        if(!cartItems[itemId] ){
            setCartItems((prev) => ({...prev, [itemId] : 1}))
        }else{
            setCartItems((prev) => ({ ...prev, [itemId] : prev[itemId] + 1}))
        }


        if(token){
            await axios.post(url + "/api/cart/add", {itemId}, {headers : {token}})
        } 
    }
    


    const removeFromCart = async (itemId) => {
        // will decrease the value of item by 1
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));


        if(token){
            await axios.post(url + "/api/cart/remove", {itemId} , {headers : {token}})
        }

    }

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

    // //testing
    // useEffect(() => {
    //     console.log(cartItems)
    // },[cartItems])

    //we can use there anywhere
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;