import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from 'react-router'
import Carousel from '../../Components/Carousel'
import Card from '../../Components/Card'
import man from '../../assets/him.jpg'
import women from '../../assets/her_.jpg'

function Home() {
const imageurl="http://localhost:3000/public/"
const[category,setCategory]= useState([])
const[types,setTypes]= useState([])
const[products,setProducts]= useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/category")
    .then((res)=>{ 
    setCategory(res.data)})
    .catch((err)=>{console.log(err)})
    
    axios.get("http://localhost:3000/type")
    .then((res)=>{ 
     setTypes(res.data)})
    .catch((err)=>{console.log(err)})

    axios.get("http://localhost:3000/product/latest")
    .then((res)=>{ 
     setProducts(res.data)})
    .catch((err)=>{console.log(err)})    
  },[])

    
  return (
    <>
      <Carousel/>
      {/* category */}
<section className="container py-5">
<h4 className="text-center  text-light text-uppercase">Attractive Jewellary</h4>
<p className="text-center display-4 p-0 text-uppercase">Gorgeous Jewellary</p>
<div className="row py-5">
{category.map((obj,i)=>{return (
<div className="col-md-2" key={i}>
<Link className="text-decoration-none text-dark" to={"/shop/category/"+obj.category}>
<img src={imageurl+obj.image}  alt="" className="w-100 h-auto text-center rounded-circle"/>
<h5 className="text-center py-3">{obj.category}</h5>
</Link>
</div>
)})
}
</div>
</section>
{/* gender */}
<div className='bg-theme'>
<section className="container py-5">
{/* <h4 className="text-center  text-light text-uppercase">Attractive Jewellary</h4> */}
<p className="text-center display-4 p-0 text-uppercase">Jewelry for Every Style</p>
<div className="row py-5 justify-content-evenly">
<div className="col-md-5">
<Link className="text-decoration-none text-dark" to="/shop/for/Men"> <img src={man} className='w-100' height={500}/> </Link>
</div>
<div className="col-md-5">
<Link className="text-decoration-none text-dark" to="/shop/for/Women"><img src={women} className='w-100'  height={500}/></Link>
</div>
</div>
</section>
</div>
{/*  product */}
<section className="container py-5">
{/* <h4 className="text-center  text-light text-uppercase">Attractive Jewellary</h4> */}
<p className="text-center display-4 p-0 text-uppercase">We Think You Will Love This</p>
<div className="row py-5">
{products.map((obj,i)=>{return (<div className="col-md-3" key={i}> <Card product={obj}/></div>)})}
</div>
</section>
{/* types */}
<section className="pt-5">
<div className="row">{
types.map((obj,i)=>{return (
<div className="col-md px-0" key={i}>
<Link className="text-decoration-none text-dark" to={"/shop/type/"+obj.type}>
<img src={imageurl+obj.image}  alt="" className="w-100 text-center" height={250}/>
</Link>
{/* <h5 className="text-center py-3">{obj.type}</h5> */}
</div>
)})
}
</div>
</section>
    </>
  )
}

export default Home
