import React, { useState } from 'react'
import axios from "axios"
// import {Link, useNavigate} from 'react-router'
function Addressform({setInsResponse,userId}) {
     const [formData, setFormData] = useState({area:'',address:'',pincode:'',contact_person:'',contact_no:"",user:null})
        const [error, setError] = useState({})
        const [response, setResponse] = useState({message:'',success:''})
        const iserror=()=>{
            let e={}
             if(formData.area=='')
                e.area='Please Fill Area'
             if(formData.address=='')
                e.address='Please Fill the Address'
            if(formData.pincode=='')
                e.pincode='Please Enter Your Pincode ';
            if(formData.contact_person=='')
                e.contactPerson='Please Enter Your Contact Person';
    
            if(formData.contact_no=='')
              e.contactno='Please Enter Your Contact Number';
    
            setError(e)
            if(Object.keys(e).length>0){
                return true
    }
        }
        const handleSubmit=(e)=>{
            e.preventDefault()
            if(!iserror()){
                axios.post('http://localhost:3000/address/'+userId,formData)
                .then(res=>{
                    setResponse(res)
                    setInsResponse(true)
                })
                .catch(err=>{console.error('Error'+err)})
            }
        }
  return (
  <>
<form onSubmit={(e)=>handleSubmit(e)}>
    <h6 className="py-3 fw-bold">Add New Address</h6>
    <div className="row mb-4">
        <div className="col">
            <input type="text" className="form-control border-0 border-bottom" placeholder="Address"value={formData.address}onChange={(e)=>{setFormData({...formData,address:e.target.value})}} />
            <span className="text-danger small">{error.address}</span>
        </div>
        
    </div>

    <div className="row mb-4">
        <div className="col">
            <input type="text" className="form-control border-0 border-bottom" placeholder="Area" value={formData.area}onChange={(e)=>{setFormData({...formData,area:e.target.value})}} />  
            <span className="text-danger small">{error.area}</span>     
        </div>
        <div className="col">
            <input type="text" className="form-control border-0 border-bottom" placeholder="Pincode" value={formData.pincode}onChange={(e)=>{setFormData({...formData,pincode:e.target.value})}}/>
            <span className="text-danger small">{error.pincode}</span>
        </div>
       
    </div>
    <div className="row mb-4">
        <div className="col">
            <input type="text" className="form-control border-0 border-bottom" placeholder="Contact_Person" value={formData.contact_person}onChange={(e)=>{setFormData({...formData,contact_person:e.target.value})}} />
            <span className="text-danger small">{error.contact_person}</span>       
        </div>
        <div className="col">
            <input type="number" className="form-control border-0 border-bottom" placeholder="Contact_No" value={formData.contact_no}onChange={(e)=>{setFormData({...formData,contact_no:e.target.value})}}/>
            <span className="text-danger small">{error.contact_no}</span>       
        </div>
       
    </div>
    <button className="btn w-100 m-auto d-block bg-light mt-5">Save Address</button>
    <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>

</form>

  </>
  )
}

export default Addressform
