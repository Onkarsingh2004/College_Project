import React, { useState,useEffect } from 'react'
import axios from "axios"
import Banner from '../../Components/Banner'
import {useNavigate} from 'react-router'
function ChangePassword() {
   const [formData, setFormData] = useState({password:"",cpass:""})
              const [error, setError] = useState({})
              const [response, setResponse] = useState({message:'',success:''})
              const[userId,setUserId]= useState("")
              const navigate = useNavigate()
              const iserror=()=>{
                let e={}
                 if(formData.password=='')
                    e.npass='Please Fill New Password'
                if(formData.cpass=='')
                    e.cpass='Please Fill The Password ';
                setError(e)
                if(Object.keys(e).length>0){
                    return true
        }
    }
     useEffect(()=>{
                let uid =localStorage.getItem('userid')
                if(uid)
                  setUserId(uid)
               },[])
                const handleSubmit=(e)=>{
                           e.preventDefault();     
                           if(!iserror()){
                           axios.put('http://localhost:3000/user/password/'+userId, formData)
                           .then(res => {
                             setResponse(res.data)
                          
                           })
                           .catch(err =>{ console.error('Error'+err)})
                         }
                       }
  return (
    <div>
       <Banner title={"Change Password"} pname="Change Password"/>
       <div className="container py-5">
        <div className="row justify-content-center ">
            <div className="col-md-5 border-theme mt-5 p-5 rounded ">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h2 className=" text-center pb-4">Change Password</h2>
{/*         
                    <div className="mb-4">
                        <input type="password" className="form-control border-0 border-bottom" placeholder="Current Password "  value={formData.cntpass}onChange={(e)=>{setFormData({...formData,cntpass:e.target.value})}}/>
                        <span className="text-danger small">{error.cntpass}</span>
                    </div> */}
                    <div className="mb-4">
                        <input type="password" className="form-control border-0 border-bottom" placeholder="New Password"  value={formData.password}onChange={(e)=>{setFormData({...formData,password:e.target.value})}} />
                        <span className="text-danger small">{error.npass}</span>
                    </div>
                    <div className="mb-4">
                        <input type="password" className="form-control border-0 border-bottom" placeholder="Conform Password"  value={formData.cpass}onChange={(e)=>{setFormData({...formData,cpass:e.target.value})}}  />
                        <span className="text-danger small">{error.cpass}</span>
                    </div>
                    
        
                
                    <button type="submit" className="btn  w-100 m-auto d-block bg-light mt-5">Update Password</button>
                    <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
                </form>
                </div>
    </div>
    </div>
    </div>
  )
  
}


export default ChangePassword
