import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router'
import Banner from '../../Components/Banner'

function Cart() {
  const [cartResult, setCartResult]=useState([])
  const [delResponse,setDelResponse]=useState('')
  const [cartSummary, setCartSummary]=useState({total:0, discount:0,net:0})
  const [updateResponse,setUpdateResponse]=useState('')
  const {cartItems,setCartItems}=useCart()
  const imageurl="http://localhost:3000/public/"
  useEffect(()=>{
    let userid= localStorage.getItem('userid')
    axios.get('http://localhost:3000/cart/'+userid)
    .then((res)=>{
      setCartResult(res.data.response)
      setCartSummary(res.data.summary)
    })
    .catch((err)=>{console.log(err)})

  },[delResponse,updateResponse])

  const handleDelete=(id)=>{
    axios.delete('http://localhost:3000/cart/'+id)
   .then((res)=>{setDelResponse(res.data)
    setCartItems(cartItems-1)
   })
   .catch((err)=>{console.log(err);}
   )
  }

  const handleChange=(id,val)=>{
    if(val>0 && val<=5) 
    { 
    axios.put('http://localhost:3000/cart/'+id,{qty:val})
    .then((res)=>{setUpdateResponse(res.data)})
    .catch((err)=>{console.log(err);})
    }
  }
  return (
    <>
          
    <Banner title="Shopping Cart" pname="Cart"/>
    <main class="container" style={{'minHeight':'400px'}}>
      {
        cartResult.length<=0 ?( 
        <div className='text-center'>
        <h1 class="text-light text-uppercase pt-5 display-2">Nothing Found In Cart </h1>
       <p> <i class="bi bi-cart display-1" ></i></p>
       <Link to='/' className='text-dark '> <button class="btn bg-light rounded m-4">Continue Shopping</button></Link>
        </div> ): (
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
                cartResult.map((c,i)=>{ 
                  return (<div className="row my-3" key={i}>
                  <div className="col-md"><img src={imageurl+c.product.image} height={'80px'} width={'80px'} /></div>
                  <div className="col-md-4 ">
                    <strong>{c.product.title}</strong>
                    <p>Type: {c.product.type}</p>
                  
                    <a className='text-danger text-decoration-none small' onClick={()=>handleDelete(c._id)}> Delete</a>
                  </div>
                  <div className="col-md">
                  <a className='text-theme text-decoration-none small' onClick={()=>handleChange(c._id,c.qty-1)}> - </a> 
                    &nbsp; {c.qty}   &nbsp; 
                    <a className='text-theme text-decoration-none small' onClick={()=>handleChange(c._id,c.qty+1)}> + </a>
   
                    </div>
                  <div className="col-md">{c.product.sale_price} <br /> <del className='text-muted small'>{c.product.mrp}</del>   </div>
                  <div className="col-md">{c.qty*c.product.sale_price}</div>
                  
                </div>)
                })
              }
            </div>
            <div className="col-md-4">
              <div className='bg-light p-4'>
                <h4 className=' p-3'>Summary</h4>
                <table className='w-100'>
                  <tbody>
                    <tr className='border-bottom border-dark lh-lg'>
                      <th>Total:</th>
                      <td>{cartSummary.total}</td>
                    </tr>
                    <tr className='border-bottom border-dark lh-lg'>
                      <th>Discount:</th>
                      <td>{cartSummary.discount}</td>
                    </tr>
                    <tr className='lh-lg'>
                      <th>Net:</th>
                      <td>{cartSummary.net}</td>
                    </tr>
                  </tbody>
                </table>
               <Link to='/checkout'> <button className='btn bg-theme w-100 mt-3 '>Proceed To Checkout</button></Link>
              </div>
            </div>
          </div>
        )
      }
    </main>
    
    </>
  )
}

export default Cart