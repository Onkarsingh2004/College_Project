import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link , useNavigate} from 'react-router'
import {useAuth} from '../context/AuthContext'
import {useCart} from '../context/CartContext'
import {useAdminAuth} from '../context/AdminAuthContext'

function Header() {
    const navigate=useNavigate()
    const {isLoggedin,setIsLoggedin}= useAuth()
    const {cartItems,setCartItems}= useCart()
    const {isAdmin,setIsAdmin} =useAdminAuth()

    const handleLogout=()=>{
      localStorage.removeItem('userid')
      localStorage.removeItem('useremail')
      setIsLoggedin(false)
      navigate('/')
    }
  

  const[category,setCategory]= useState([])
  const[types,setTypes]= useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/category")
    .then((res)=>{ setCategory(res.data)})
    .catch((err)=>{console.log(err)})
    
    axios.get("http://localhost:3000/type")
    .then((res)=>{ 
    setTypes(res.data)})
    .catch((err)=>{console.log(err)})
    
    },[])
  return (
    <>
         <header className="bg-theme">
        <div className="row justify-content-center pt-3">
            <div className="col-md-7">
                <p>
                  <Link to="/about" className="text-white text-decoration-none">About Us</Link>&nbsp; | &nbsp;
                   <Link to="/contact" className="text-white text-decoration-none ">Contact Us</Link>&nbsp; | &nbsp;

                   {
                    isAdmin && (
                       <Link className='text-white text-decoration-none ' to='/admin/orders'><i className='bi bi-person text-warning'></i>Admin Panel</Link>
                    )
                   }

                </p>
            </div>
            <div className="col-md-4 text-end">
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
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Shop By Category
          </a>
          <ul className="dropdown-menu">
    { category.map((obj,i)=> <li key={i}><Link className="dropdown-item" to={"/shop/category/"+obj.category}>{obj.category}</Link></li> )  }

            
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Shop By Type
          </a>
          <ul className="dropdown-menu">
    { types.map((obj,i)=> <li key={i}><Link className="dropdown-item" to={"/shop/type/"+obj.type} >{obj.type}</Link></li> )  }

            
          </ul>
        </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Shop For
            </a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/shop/for/Women">Women</Link></li>
              <li><Link className="dropdown-item" to="/shop/for/Men">Men</Link></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Shop By Price
            </a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/shop/price/0/1000">Under 1000</Link></li>
              <li><Link className="dropdown-item" to="/shop/price/1000/2000">1000 TO 2000</Link></li>
              <li><Link className="dropdown-item" to="/shop/price/2000/3000">2000 TO 3000</Link></li>
              <li><Link className="dropdown-item" to="/shop/price/3000/5000">3000 TO 5000</Link></li>
              <li><Link className="dropdown-item" to="/shop/price/5000/50000">Above 5000</Link></li>
            </ul>
          </li>
         
    
      
    </ul>
      <ul className="navbar-nav ms-auto">
      
        <li className="nav-item">
          <Link className="nav-link" to="/cart"><i className="bi bi-cart"></i>Cart <sup className='text-warning'>{cartItems}</sup> </Link>
        </li>
        

  {isLoggedin ? (
    <>
    <li className="nav-item">
    <Link className="nav-link" to='/user/orders'>
      <i className="bi bi-person"></i> My Account
    </Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link" onClick={handleLogout}>
      <i className="bi bi-box-arrow-in-right"></i> Logout
    </Link>
    </li>
    </>
  ) : (
    <li className="nav-item">
    <Link className="nav-link" to="signin">
      <i className="bi bi-box-arrow-in-right"></i> Login
    </Link>
    </li>
  )}
        
      </ul>

    </div>
  </div>
</nav>
    </>
  )
}

export default Header
