import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import SIdebar from "./Components/Sidebar/SIdebar"
import Add from "./Pages/ADD/Add"
import List from "./Pages/LIST/List"
import Orders from "./Pages/ORDERS/Orders"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = 'http://localhost:4000'

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <SIdebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App