import React, { useEffect, useState } from 'react'
import axios from "axios"
import CategoryForm from './CategoryForm'

function Categories() {
const imageurl="http://localhost:3000/public/"
const[result,setResult]= useState([])
const[delresponse,setDelResponse]=useState("")
const[insresponse,setInsResponse]=useState(true)

useEffect(()=>{
axios.get("http://localhost:3000/category")
.then((res)=>{ console.log(res.data);
setResult(res.data)})
.catch((err)=>{console.log(err)})
},[delresponse,insresponse])

const handleDelete= (id)=>{
axios.delete("http://localhost:3000/category/"+id)
.then((res)=>{setDelResponse(res.data);})
.catch((err)=>{console.log(err)})
}

return (
<main className="p-5">
<div className="row justify-content-start">
<div className="col-md-4">
<div className=' bg-light p-5'>
<CategoryForm setInsResponse={setInsResponse}/>
</div>
</div>
<div className="col-md-7">
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
            result.map((category)=>{ return (<tr key={category.id}>
            <td>{category.category}</td>
            <td><img src={imageurl+category.image} height={'70px'} width={'70px'} /></td>
            <td><a onClick={()=>handleDelete(category._id)}>
            <i className='bi bi-trash text-danger'></i></a></td>
        </tr>)
            })
        }
        
        
    </tbody>
  </table>
</div>
</div>
</main> 
)
}

export default Categories
