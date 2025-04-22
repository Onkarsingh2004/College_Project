import React, { useEffect, useState } from 'react'
import axios from "axios"
import Card from '../../Components/Card'
import { useParams } from "react-router";
import Banner from '../../Components/Banner'


function Shop() {
  let params = useParams();
  const[products,setProducts]= useState([])
  const[tag,setTag]= useState("")
  useEffect(() => {
    let url="http://localhost:3000/product/"
   
    if(params.hasOwnProperty("category")){
    url+="category/"+params.category
    setTag(params.category+"'s Collection")
  }  else if(params.hasOwnProperty("type")){
      url+="type/"+params.type
      setTag(params.type)
  }    else if(params.hasOwnProperty("for")){
      url+="genderType/"+params.for
      setTag(params.for+"'s Collection")
  }    else if(params.hasOwnProperty("min")){
      url+="price/"+params.min+"/"+params.max
      setTag("Our Collection")
      }

    axios.get(url)
    .then((res)=>{ console.log(res.data);
     setProducts(res.data)})
    .catch((err)=>{console.log(err)})  
  }, [params]);
 


  return (
    <>
      
      <Banner title={tag} pname="Shop"/>
<section className="container py-5">
<div className="row py-5">
{products.map((obj,i)=>{return (<div className="col-md-3" key={i}> <Card product={obj}/></div>)})}
</div>
</section>

    </>
  )
}

export default Shop
