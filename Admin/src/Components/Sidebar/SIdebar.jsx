import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/admin_assets/assets'
import './Sidebar.css'

function SIdebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-option">
            <NavLink to={"/add"} className="sidebar-options">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to={"/list"} className="sidebar-options">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to={"/orders"} className="sidebar-options">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SIdebar