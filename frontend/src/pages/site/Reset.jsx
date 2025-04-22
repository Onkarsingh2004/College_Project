import React, { useState, useEffect } from 'react'
import axios from "axios"
import {Link, useNavigate} from 'react-router'
import { useLocalStorage } from 'react-use';

function Reset() {
     const [formData, setFormData] = useState({code:"",password:"",cpassword:""})
        const [error, setError] = useState({})
        const [response, setResponse] = useState({message:'',success:''})
        const[vcode,setVcode]= useState("")
        const[vemail,setVemail]= useState("")

        const navigate = useNavigate()
        const iserror=()=>{
           let e={}
         
            if(formData.code=='')
                e.code='Please Enter The Code ';
                else if (formData.code!=vcode)
                    e.code='Enter Correct Code '; 
             if (formData.password=="")
              e.password='Enter New Password'
             if (formData.cpassword=="")
                e.cpassword='Confirm your password'
            else if(formData.password!=formData.cpassword)
                e.password='Retype Password Not matched'
            setError(e)
            if(Object.keys(e).length>0){
                return true
    }
        }
        useEffect(()=>{
            let vemail=localStorage.getItem('vemail')
            if(vemail)
              setVemail(vemail)
            let vcode=localStorage.getItem('vcode')
            if(vcode)
              setVcode(vcode)
           },[])

        const handleSubmit=(e)=>{
            e.preventDefault();     
            if(!iserror()){
            axios.put('http://localhost:3000/user/resetpassword/'+vemail, formData)
            .then(res => {
              setResponse(res.data)
              if(res.data.success)
                {
                localStorage.removeItem('vcode');
                localStorage.removeItem('vemail');
                setTimeout(()=>{navigate('/signin')},3000)
                }  
            })
            .catch(err =>{ console.error('Error'+err)})
          }
        }
        
  return (
    <div>
          <div className="p-5 text-center text-dark banner" >
        <h3 className="display-4">Reset Password </h3>
        <p className="p-3">Home &nbsp; <i className="bi bi-diamond-fill"></i> &nbsp; Forget Password</p>
    </div>

    <div className="container py-5">
        <div className="row justify-content-center ">
            <div className="col-10 col-md-8 col-lg-6 border-theme mt-5 p-5 rounded ">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <p className="display-4 text-center">Reset Password</p>
                    <p className="text-center mb-4">Back To ? <Link to="/signin" className='text-dark text-decoration-none'>Sign in</Link></p>
        
                    <div className="mb-4">
                        <input type="number" id="number" className="form-control border-0 border-bottom" placeholder="Verification Code" value={formData.code}onChange={(e)=>{setFormData({...formData,code:e.target.value})}}/>
                        <span className="text-danger small">{error.code}</span>
                    </div>
                    <div className="mb-4">
                        <input type="password" id="password" className="form-control border-0 border-bottom" placeholder="New Password"
                         value={formData.password}onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>
                          <span className="text-danger small">{error.password}</span>
                    </div>
                    <div className="mb-4">
                        <input type="password" id="cpassword" className="form-control border-0 border-bottom" placeholder="Confirm Password"
                         value={formData.cpassword}onChange={(e)=>{setFormData({...formData,cpassword:e.target.value})}}/>
                          <span className="text-danger small">{error.cpassword}</span>
                    </div>
                    
        
                
                    <button type="submit" className="btn  w-50 m-auto d-block bg-light mt-5">Reset Password</button>
                    <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
                    <button type="submit" className="btn  w-25 m-auto d-block mt-2">Cancel</button>
                </form>
        
        
                
        
            </div>
        </div>
            </div>
    </div>
  )
}

export default Reset
