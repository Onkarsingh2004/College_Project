import React, { useState } from 'react'
import axios from "axios"
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../../context/AuthContext'

function Signin() {
        const{isLoggedin,setIsLoggedin}= useAuth()
        const [formData, setFormData] = useState({email:'',password:''})
        const [error, setError] = useState({})
        const [response, setResponse] = useState({message:'',success:''})
        const navigate = useNavigate()
        const iserror=()=>{
            let e={}
            if(formData.email=='')
                e.email='Please Enter Your Email Address ';
            else if (!/\S+@\S+\.\S+/.test(formData.email))
              e.email='Invalid Email Address'    
            if(formData.password=='')
              e.password='Please Enter Your Password';
            setError(e)
            if(Object.keys(e).length>0){
                return true
    }
        }
        const handleSubmit=(e)=>{
          e.preventDefault()
          if(!iserror()){
              axios.post('http://localhost:3000/user/login',formData)
              .then(res=>{
                  setResponse(res.data)
                  if(res.data.success){ 
                    localStorage.setItem('userid',res.data.user.userId)
                    localStorage.setItem('useremail',res.data.user.email)
                    localStorage.setItem('username',res.data.user.name)
                    setIsLoggedin(true)
                      setTimeout(()=>{navigate('/')},1000)
                  }
              })
              .catch(err=>{console.error('Error'+err)})
          }
      }
  
  return (
    <div>
          <div className="p-5 text-center text-dark banner" >
        <h3 className="display-4">Welcome User</h3>
        <p className="p-3">Home &nbsp; <i className="bi bi-diamond-fill"></i> &nbsp; Account</p>
    </div>


    <div className="container py-5">
        <div className="row justify-content-center ">
            <div className="col-10 col-md-8 col-lg-6 border-theme mt-5 p-5 rounded ">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <p className="display-4 text-center">Login</p>
                    <p className="text-center mb-5"> Don't Have An Account? <Link to="/Signup" className="text-dark text-decoration-none">Create Account</Link> </p>
        
                    <div className="mb-4">
                        <input type="text" id="email" className="form-control border-0 border-bottom" placeholder="Enter your email"
                         value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
                        <span className="text-danger small">{error.email}</span>
                    </div>
        
        
                    <div className="mb-4">
                        <input type="password" id="password" className="form-control border-0 border-bottom" 
                        placeholder="Enter your password"value={formData.password}onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>
                        <span className="text-danger small">{error.password}</span>
                    </div>
        
                
                    <button type="submit" className="btn  w-50 m-auto d-block bg-light mt-5">Login Now</button>
                    <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
                </form>
        
        
                <div className="mt-5 d-flex justify-content-between">
                    <Link to="/Forgot" className=" text-dark text-decoration-none">Forgot Your Password?</Link>
                    <Link to="/Signup" className=" text-theme text-decoration-none ">Sign Up</Link>
                </div>
        
            </div>
        </div>
            </div>
    </div>
  )
}

export default Signin
