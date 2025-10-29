import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assests/Frontend_Assets/logo.png'
import cart_icon from '../assests/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Contextprovider'
import nav_dropdown from '../assests/Frontend_Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu,setmenu]=useState("shop");
    const {cartitem} = useContext(Context);

    // Helper to get total items in cart
    const gettotalitems = () => {
      let total = 0;
      for (const item in cartitem) {
        total += cartitem[item];
      }
      return total;
    }

    const menuRef = useRef();
    const dropdown_toggle = (e)=>{
     menuRef.current.classList.toggle("nav-menu-visible");
      e.target.classList.toggle("open");
    }


  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
    <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setmenu("shop")}><Link style={{textDecoration:"none"}} to="/">Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={() => setmenu("mens")}><Link style={{textDecoration:"none"}} to="/mens">Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={() => setmenu("womens")}><Link style={{textDecoration:"none"}} to="/womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={() => setmenu("kids")}><Link style={{textDecoration:"none"}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
    </ul>

    <div className="nav-login-cart">
      {localStorage.getItem('auth-token')
        ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
        : <Link to='/login'><button>Login</button></Link>
      }
      <Link to="/cart"><img src={cart_icon} alt="Cart" /></Link>
      <div className="nav-cart-count">{gettotalitems()}</div>
    </div>
    </div>
  )
}

export default Navbar
