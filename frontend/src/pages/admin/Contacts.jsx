import React, { useEffect, useState } from 'react'
import axios from "axios"

function Contacts() {
    const[result,setResult]= useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/contact")
        .then((res)=>{ console.log(res.data);
        setResult(res.data)})
        .catch((err)=>{console.log(err)})
        },[])
  return (
    <div>
      <main className="p-5">
<div className="row justify-content-start">
<div className="col-md-10">
</div>
<div className="col-md-10">
  <h2 className=''>Web Enqueries</h2>
  <table className='table'>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Message</th>
        </tr>
    </thead>
    <tbody>
        {
            result.map((contact)=>{ return (<tr key={contact.id}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone_no}</td>
            <td>{contact.message}</td>
            
        </tr>)
            })
        }
        
        
    </tbody>
  </table>
</div>
</div>
</main> 
    </div>
  )
  
}

export default Contacts
