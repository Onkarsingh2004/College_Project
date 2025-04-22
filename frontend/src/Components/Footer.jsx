import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router'

function Footer() {
    const[category,setCategory]= useState([])
     const[types,setTypes]= useState([])
     useEffect(()=>{
        axios.get("http://localhost:3000/category")
        .then((res)=>{ 
        setCategory(res.data)})
        .catch((err)=>{console.log(err)})

        axios.get("http://localhost:3000/type")
    .then((res)=>{ 
     setTypes(res.data)})
    .catch((err)=>{console.log(err)})
        },[])
  return (
    <>
<footer className="bg-theme py-5">
    <div className="container">
        <div className="row py-4">
            <div className="col-md-4">
                <h2 className="mb-3 tag">Glamsphere</h2>
                <p className='pe-4'>Explore our range of contemporary designs, from minimalist pendants and delicate earrings to bold statement pieces that make a lasting impression.</p>
                <i className="bi bi-facebook pe-2"></i>
                <i className="bi bi-instagram pe-2"></i>
                <i className="bi bi-twitter"></i>
                        </div>

            <div className="col-md-2 ">
                <p className="fw-bold ">Quick Links</p>
                <ul className="lh-lg">
                    <li> <Link to="/" className="text-white text-decoration-none ">Home</Link>  </li>
                    <li> <Link to="/about" className="text-white text-decoration-none ">About Us</Link>   </li>
                    <li> <Link to="/contact" className="text-white text-decoration-none ">Contact Us</Link>  </li>            
                </ul>
            </div>
            <div className="col-md-2">
                <p className="fw-bold ">My Account</p>
                <ul className="lh-lg">
                    <li> <Link to="/signup" className="text-white text-decoration-none ">Register</Link>   </li>
                    <li> <Link to="/signin" className="text-white text-decoration-none ">Sign In</Link>  </li>
                    <li> <Link to="/user/orders" className="text-white text-decoration-none ">My Order</Link>  </li>
                    <li> <Link to="/user/Address" className="text-white  text-decoration-none">My Address</Link>   </li> 
                </ul>
            </div>
            <div className="col-md-2">
                <p className="fw-bold ">My Shop</p>
               <ul className="lh-lg">
                   { category.map((obj,i)=> <li key={i}><Link className="dropdown-item" to={"/shop/category/"+obj.category} >{obj.category}</Link></li> )  }
               </ul>
            </div>
            <div className="col-md-2">
                <p className="fw-bold ">My Shop</p>
               <ul className="lh-lg">
                   { types.map((obj,i)=> <li key={i}><Link className="dropdown-item" to={"/shop/type/"+obj.type} >{obj.type}</Link></li> )  }
               </ul>
            </div>
        </div>
    </div>

</footer>




    </>
  )
}

export default Footer
