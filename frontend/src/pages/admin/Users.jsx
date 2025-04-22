import React, { useEffect, useState } from 'react'
import axios from "axios"

function Users() {
    const[result,setResult]= useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/user")
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
<div className="col-md-11">
  <h2 className=''>Users</h2>
  <table className='table'>
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            
        </tr>
    </thead>
    <tbody>
        {
            result.map((user)=>{ return (<tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.reg_date}</td>
            
            
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

export default Users

