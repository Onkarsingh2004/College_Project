import React, { useState } from 'react'
import axios from "axios"
import {Link, useNavigate} from 'react-router'

function Forgot() {
  const [formData, setFormData] = useState({email:''})
          const [error, setError] = useState({})
          const [response, setResponse] = useState({message:'',success:''})
          const navigate = useNavigate()
          const iserror=()=>{
            let e={}
            
            if(formData.email=='')
                e.email='Please Enter Your Email Address ';
    
            else if (!/\S+@\S+\.\S+/.test(formData.email))
              e.email='Invalid Email Address'
    
            setError(e)
            if(Object.keys(e).length>0){
                return true
    }
        }

        const handleSubmit=(e)=>{
          e.preventDefault()
          if(!iserror()){
              axios.post('http://localhost:3000/user/forgot',formData)
              .then(res=>{
                  setResponse(res.data)
                  if(res.data.success){
                    localStorage.setItem('vcode',res.data.random)
                    localStorage.setItem('vemail',formData.email)
                      setTimeout(()=>{navigate('/reset')},2000)
                  }
              })
              .catch(err=>{console.error('Error'+err)})
          }
      }

  return (
    <>
      <div
        className="p-5 text-center text-dark banner"
        
      >
        <h3 className="display-4">Forget Password ?</h3>
        <p className="p-3">
          Home &nbsp; <i className="bi bi-diamond-fill"></i> &nbsp; Forget Password
        </p>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6 border-theme mt-5 p-5 rounded">
            <form  onSubmit={(e)=>handleSubmit(e)}>
              <p className="display-4 text-center">Forget Password</p>
              <p className="text-center mb-4">
                Back To ? <Link to="/signin" className="text-dark">Sign in</Link>
              </p>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control border-0 border-bottom"
                  placeholder="Enter Your Email"
                  value={formData.email}onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                />
                <span className="text-danger small">{error.email}</span>
              </div>

              <button type="submit" className="btn w-50 m-auto d-block bg-light mt-5">
                Recover Password
              </button>
              <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
              <button type="button" className="btn w-25 m-auto d-block mt-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
