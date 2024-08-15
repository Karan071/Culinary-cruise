import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Add from "./Components/Pages/Add/Add"
import Orders from "./Components/Pages/Orders/Orders";
import List from "./Components/Pages/List/List"
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  
  return (
    <div>
        <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
      <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/list" element={<List />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
