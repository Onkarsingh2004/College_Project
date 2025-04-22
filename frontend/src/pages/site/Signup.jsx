import React, { useState } from 'react'
import axios from "axios"
import {Link, useNavigate} from 'react-router'

function Signup() {

    const [formData, setFormData] = useState({first_name:'',last_name:'',email:'',phone:'',password:"",cpassword:""})
    const [error, setError] = useState({})
    const [response, setResponse] = useState({message:'',success:''})
    const navigate = useNavigate()
    
    const iserror=()=>{
        let e={}
         if(formData.first_name=='')
            e.category='Please Fill First Name'
         if(formData.last_name=='')
            e.category='Please Fill Last Name'
        if(formData.email=='')
            e.email='Please Enter Your Email Address ';

        else if (!/\S+@\S+\.\S+/.test(formData.email))
          e.email='Invalid Email Address'

        if(formData.phone=='')
            e.phone='Please Enter Your Contact No';

        else if (!/^[0-9]{10}$/.test(formData.phone))
          e.phone='Invalid Phone Number'

        if(formData.password=='')
          e.password='Please Enter Your Password';

        else if (formData.password.length < 8)
          e.password='Password must be at least 8 characters long'

        if(formData.password!=formData.cpassword)
            e.password='Retype Password Not Matched ';

        setError(e)
        if(Object.keys(e).length>0){
            return true
}
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!iserror()){
            axios.post('http://localhost:3000/user/register',formData)
            .then(res=>{
                setResponse(res)
                if(res.success)
                    setTimeout(()=>{navigate('/signin')},1000)
            })
            .catch(err=>{console.error('Error'+err)})
        }
    }


  return (
    <>
     <div className="p-5 text-center text-dark banner" >
        <h3 className="display-4">Create Account</h3>
        <p className="p-3">Home &nbsp; <i className="bi bi-diamond-fill"></i> &nbsp; Create Account</p>
    </div>


    <div className="container py-5">
        <div className="row justify-content-center ">
            <div className=" col-10 col-md-8 col-lg-6 border-theme mt-5 p-5 rounded">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <p className="display-4 text-center">Sign UP</p>
                    <p className="text-center mb-4">Already have an account? <Link to="/signin" className="text-dark text-decoration-none">Sign in</Link></p>
        
                    <div className="mb-4">
                        <input type="text" id="first_name" className="form-control border-0 border-bottom" placeholder="First Name" value={formData.first_name}onChange={(e)=>{setFormData({...formData,first_name:e.target.value})}}/ >
                        <span className="text-danger small">{error.first_name}</span>
                    </div>
        
        
                    <div className="mb-4">
                        <input type="text" id="last_name" className="form-control border-0 border-bottom" placeholder="Last Name"  value={formData.last_name}onChange={(e)=>{setFormData({...formData,last_name:e.target.value})}}/>
                        <span className="text-danger small">{error.last_name}</span>
                    </div>

                    <div className="mb-4">
                        <input type="telephone" id="Phone" className="form-control border-0 border-bottom" placeholder="Phone No" value={formData.phone}onChange={(e)=>{setFormData({...formData,phone:e.target.value})}}/>
                        <span className="text-danger small">{error.phone}</span>
                    </div>

                    <div className="mb-4">
                        <input type="email" id="email" className="form-control border-0 border-bottom" placeholder="Email"
                         value={formData.email}onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
                    <span className="text-danger small">{error.email}</span>
                    </div>

                    <div className="mb-4">
                        <input type="password" id="password" className="form-control border-0 border-bottom" placeholder="Password"
                         value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>
                  <span className="text-danger small">{error.password}</span>
                    </div>

                    <div className="mb-4">
                        <input type="password" id="cpassword" className="form-control border-0 border-bottom" placeholder="Confirm Password"
                        value={formData.cpassword} onChange={(e)=>{setFormData({...formData,cpassword:e.target.value})}}/>
                        <span className="text-danger small">{error.cpassword}</span>
                    </div>
        
                
                    <button type="submit" className="btn  w-50 m-auto d-block bg-light mt-5">Create</button>
                    <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
                </form>
            </div>
        </div>
            </div> 
    </>
  )
}

export default Signup
