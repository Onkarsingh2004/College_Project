import React, { useEffect, useState } from 'react'
import axios from "axios"
import Banner from '../../Components/Banner'
import { useParams } from "react-router";

function MOrderDetail() {
  const[result,setResult]= useState({address:{}})
  const[orderItems,setOrderItems]= useState([])
  const imageurl="http://localhost:3000/public/"
    let {id} = useParams();
  useEffect(() => {
axios.get("http://localhost:3000/order/"+id)
.then((res)=>{ console.log(res.data);setResult(res.data)})
.catch((err)=>{console.log(err)})
axios.get("http://localhost:3000/cart/orderitems/"+id)
.then((res)=>{ console.log(res.data.response);setOrderItems(res.data.response)})
.catch((err)=>{console.log(err)})

  
}, []);
  return (
    <>
       <Banner title={"Order Detail"} pname="Order Detail"/>
<main class="container" style={{'minHeight':'400px'}}>
          <div className="row py-4">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md"></div>
                <div className="col-md-4">Product Detail</div>
                <div className="col-md">Quantity</div>
                <div className="col-md">Price</div>
                <div className="col-md">Total</div>
              </div>
              {
                orderItems.map((c,i)=>{ 
                  return (<div className="row my-3" key={i}>
                  <div className="col-md"><img src={imageurl+c.product.image} height={'80px'} width={'80px'} /></div>
                  <div className="col-md-4 ">
                    <strong>{c.product.title}</strong>
                    <p>Type: {c.product.type}</p>
                  
                  </div>
                  <div className="col-md">
                    {c.qty}    
                    </div>
                  <div className="col-md">{c.product.sale_price} <br /> <del className='text-muted small'>{c.product.mrp}</del>   </div>
                  <div className="col-md">{c.qty*c.product.sale_price}</div>
                  
                </div>)
                })
              }
            </div>
            <div className="col-md-4">
            <div className='bg-light p-4 mb-2'>
                <h4 className="">Shiping Address</h4>
                <p className='mb-2 mt-3'><i className="bi bi-geo-alt"></i> {result.address.address} , {result.address.area} , Pincode : {result.address.pincode}</p>
                <p> <i className="bi bi-telephone"></i> Contact No: {result.address.contact_no} </p>
                <p> <i className="bi bi-person"></i> Contact No: {result.address.contact_person} </p>
                

              </div>
              <div className='bg-light p-4'>
                <h4 className=''>Order Summary</h4>
                <table className='w-100'>
                  <tbody>
                    <tr className='border-bottom border-dark lh-lg'>
                      <th>Amount:</th>
                      <td>{result.amount}</td>
                    </tr>
                    <tr className='border-bottom border-dark lh-lg'>
                      <th>Discount:</th>
                      <td>{result.charges}</td>
                    </tr>
                    <tr className='lh-lg border-bottom border-dark'>
                      <th>Date:</th>
                      <td>{result.order_date}</td>
                    </tr>
                    <tr className='lh-lg '>
                      <th>Status:</th>
                      <td>{result.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
      
    </main>


    </>
  )
}

export default MOrderDetail