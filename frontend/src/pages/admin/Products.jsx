import React, { useEffect, useState } from 'react'
import axios from "axios"

function Products() {
  const imageurl="http://localhost:3000/public/"
const[result,setResult]= useState([])
const[delresponse,setDelResponse]=useState("")

useEffect(()=>{
axios.get("http://localhost:3000/product")
.then((res)=>{ console.log(res.data);
setResult(res.data)})
.catch((err)=>{console.log(err)})
},[delresponse])

const handleDelete= (id)=>{
axios.delete("http://localhost:3000/product/"+id)
.then((res)=>{setDelResponse(res.data);})
.catch((err)=>{console.log(err)})
}
  return (
    <div>
      <main className="p-5">
<div className="row justify-content-start">
<div className="col-md-10">
</div>
<div className="col-md-11">
  <h2 className=''>Manage Product</h2>
  <table className='table'>
    <thead>
        <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {
            result.map((product)=>{ return (<tr key={product.id}>
            <td>{product.title}</td>
            <td><img src={imageurl+product.image} height={'70px'} width={'70px'} /></td>
            <td><a onClick={()=>handleDelete(product._id)}>
            <i className='bi bi-trash text-danger'></i></a></td>
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

export default Products
