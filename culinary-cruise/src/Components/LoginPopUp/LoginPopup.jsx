import React, { useContext,useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

import axios from "axios"
import { StoreContext } from '../context/StoreContext'

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const [currState,setcurrState] = useState("Login")
    //create state varible for saving the creds
    const [data,setData] = useState({
        name : "",
        email: "",
        password: ""
    })

    //create a onchange handler
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    // testing the data
    // useEffect(()=> {
    //     console.log(data)
    // },[data])

    return (
            <div className='login-popup'>
                <form onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img onClick = {() => setShowLogin(false)} src={assets.cross_icon}/>
                    </div>
                    <div className="login-popup-inputs">
                        {currState=== "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder= "Name" required/>}
                        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder= "Email Address" required/>
                        <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder ="Password" required/>
                    </div>
                    <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required/>
                        <p>By continuing, I agree to the terms and conditions</p>
                    </div>
                    {currState === "Login" 
                    ? <p> Create a new account ? <span onClick={() => setcurrState("Sign Up")} >Click here</span></p> 
                    : <p>Already have an account? <span onClick={() => setcurrState("Login")}>Login here</span></p> }
                    
                </form>
            </div>
  )
}

export default LoginPopup