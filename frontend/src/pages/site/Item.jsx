import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from "react-router";
import { Link } from "react-router";
import {useAuth} from '../../context/AuthContext'
import {useCart} from '../../context/CartContext'
import Banner from '../../Components/Banner'

function Item() {
  console.log(1)
  let params = useParams();
   const imageurl="http://localhost:3000/public/"
  const[product,setProduct]= useState({})
  const [qty, setQty]= useState(1)
  const [incart, setInCart]= useState(false)
  const [response, setResponse]= useState({response:'',status:''})
  const [error, setError]= useState({msg:''})
  const[userid,setUserid]= useState("")
  
  const{isLoggedin,setIsLoggedin}= useAuth()
  const {cartItems,setCartItems}= useCart()

  useEffect(() => {
    console.log(1)
    let userid=localStorage.getItem('userid')
    if(userid)
      setUserid(userid)
    let url="http://localhost:3000/product/id/"+params.id
    axios.get(url)
    .then((res)=>{ 
      console.log(res.data)
      axios.get('http://localhost:3000/cart/incart/'+params.id+"/"+userid)
      .then((r)=>{setInCart(r.data.response)})
     setProduct(res.data)})
    .catch((err)=>{console.log(err)})  
  }, [params]);

  const isError=()=>{
    let e={}
    if(qty>5)
      e.msg='Qty Not Be More Than 5'
    if(qty<1)
      e.msg='Minimum Qty Must Be 1'
    setError(e)
    if(Object.keys(e).length>0)
      return true
  }

  
  const handleCart=(e)=>{
    e.preventDefault();
    if(!isError()){
      axios.post('http://localhost:3000/cart',{user:userid,qty:qty,product:product})
      .then(res=>{
        console.log(res.data)
        setResponse(res.data)
        setCartItems(cartItems+1)
      })
      .catch(err=>{console.log('Error'+err);
      })
    }
  }
  return (
    <>
    <Banner title={product.title} pname="Shop"/>
    <section className="container py-5">
    <div className="row py-5">
    <div className="col-md-5"><img src={imageurl+product.image} className="card-img-top" alt="..." height={450}/></div>
    <div className="col-md-6 ">
    <p className="card-text"> Price : <i className="bi bi-currency-rupee"></i> {product.sale_price}  
    <del className='text-muted'> <i className="bi bi-currency-rupee"></i>{product.mrp}</del> </p>
      <h1 className='text-theme'>{product.title}</h1>
        
    {
      product.stock?(
        isLoggedin?(
          !incart?(
            <form action="">
              <div className="input-group w-50 py-3">
                <span className='input-group-text bg-theme'>Quantity</span>
                <input type="number" min={1} max={5} value={qty} onChange={(e)=>setQty(e.target.value)} className='form-control text-center' />
                <button className='btn bg-theme text-white ' onClick={(e)=>handleCart(e)}> Add To Cart </button>
              </div>
            </form>):
            ( <button className='btn bg-theme text-white w-50 py-2' disabled={true}>Item In Cart</button> )):
            ( <button className='btn bg-theme text-white w-50 py-2' disabled={true}>
            <Link to='/signin' className='text-white text-decoration-none'>Login To Add To Cart</Link>
            </button> 
            )
        ):
        ( <button className='btn btn-outline-secondary py-2' disabled>Out Of Stock</button> )
      
    }
{error.qty}
<div dangerouslySetInnerHTML={{'__html':product.description}}></div>

      </div>
      </div>
      </section>     
  </>
  )
}

export default Item