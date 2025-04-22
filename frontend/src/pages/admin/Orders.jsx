import React, { useEffect, useState } from 'react'
import { Link } from "react-router";
import axios from "axios"

function Orders() {
    const[result,setResult]= useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/order")
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
  <h2 className=''>Orders</h2>
  <table className='table'>
    <thead>
        <tr>
            <th>Amount</th>
            <th>Charges</th>
            <th>Order_date</th>
            <th>Status</th>
            <th>Detail</th>



        </tr>
    </thead>
    <tbody>
        {
            result.map((order,i)=>{ return (
            <tr key={i}>
            <td>{order.amount}</td>
            <td>{order.charges}</td>
            <td>{order.order_date}</td>
            <td>{order.status}</td>
            <td><Link to={"/admin/orderdetail/"+order._id}><i className="bi bi-list"></i></Link></td>
            
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

export default Orders

