import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link , useNavigate} from 'react-router'
import {useAuth} from '../context/AuthContext'
function Navigation() {
  const navigate=useNavigate()
    const {isLoggedin,setIsLoggedin}= useAuth()
    const handleLogout=()=>{
      localStorage.removeItem('userid')
      localStorage.removeItem('useremail')
      setIsLoggedin(false)
      setTimeout(()=>{navigate('/')},1000)
    }
  return (
    <>
         <header className="bg-theme">
        <div className="row justify-content-center pt-3">
            <div className="col-md-6">
                <p><Link to="/about" className="text-white text-decoration-none">About Us</Link>&nbsp; | &nbsp;
                    <Link to="/contact" className="text-white text-decoration-none">Contact Us</Link>
                </p>
            </div>
            <div className="col-md-5 text-end">
                <p><i className="bi bi-envelope"></i> glamsphere.asr@gmail.com &nbsp; | &nbsp; <i className="bi bi-telephone"></i> +91 98030 84620 </p>
            </div>
        </div>
        <div className="text-center py-4 bg-light">
                <h1 className=""><Link to="/" className="text-dark display-6 text-decoration-none tag">Glamsphere</Link></h1>
        </div>
    </header>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
          <Link className="nav-link" to="/"><i className="bi bi-house "></i>Home</Link>
        </li>
        </ul>
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
          <Link className="nav-link" to="/cart"><i className="bi bi-cart"></i>My Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/orders"><i className="bi bi-list"></i>My Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user/address"><i className="bi bi-geo-fill"></i>Address</Link>
        </li>
           <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My Account
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/user/profile">My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/user/changepassword">Change Password</Link></li>
                    
                    <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                    </li>
                    
                                      
                  </ul>
                </li>
       
      
      </ul>

    </div>
  
</nav>
    </>
  )
}

export default Navigation
