import React, { useEffect, useState } from 'react'
import axios from "axios"
import Addressform from './Addressform'
import Banner from '../../Components/Banner'

function MyAddress() {
  const[result,setResult]= useState([])
  const[userId,setUserId]= useState([])
  
  const[delresponse,setDelResponse]=useState(false)
  const[insresponse,setInsResponse]=useState(false)
  
  useEffect(()=>{
    let uid=localStorage.getItem('userid')
    if(uid){
      setUserId(uid)
    axios.get("http://localhost:3000/address/"+uid)
    .then((res)=>{ setResult(res.data)})
    .catch((err)=>{console.log(err)})
}},[delresponse,insresponse])
    
    const handleDelete= (id)=>{
    axios.delete("http://localhost:3000/address/"+id)
    .then((res)=>{setDelResponse(res.data);})
    .catch((err)=>{console.log(err)})
    }
  return (
    <>
    <Banner title={"My Address"} pname="Address"/>
   <main className="container py-5 border-theme my-5 p-5 rounded"> 
   <h1 className=''>Manage Address</h1>

    <div className="row">
      <div className="col-5">
      <Addressform setInsResponse={setInsResponse} userId={userId}/>

      </div>
      <div className="col-md-7">
  <table className='table pt-4'>
    <thead>
        <tr>
            <th className='w-75'>Address</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {
            result.map((address,i)=>{ return (<tr key={i}>
            <td> <i className="bi bi-geo-alt"></i>  {address.address} , {address.area},{address.pincode} <br/>
            Contact Person : {address.contact_person} <i className="bi bi-phone"></i> Phone No {address.contact_no}</td>
            <td><a onClick={()=>handleDelete(address._id)}>
            <i className='bi bi-trash text-danger'></i></a></td>
        </tr>)
            })
        }
        
        
    </tbody>
  </table>
</div>
</div>
</main>
    </>
  )
}

export default MyAddress
