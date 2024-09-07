import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Orders from "./Pages/Orders/Orders"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = "https://culinary-cruise-brach.onrender.com"

  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <hr />
    <div className="app-content">
    <Sidebar/>
    <Routes>
      <Route path='/add' element={<Add url = {url} />} />
      <Route path='/list' element={<List url = {url}/>} />
      <Route path='/orders' element={<Orders url = {url}/>} />
    </Routes>
    </div>
    </>
  )
}

export default App
