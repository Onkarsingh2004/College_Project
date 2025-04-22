import React, { useEffect, useState } from 'react'
import axios from "axios"
import Editor from './Editor'


function ProductForm() {

const[category,setCategory]= useState([])
const[types,setTypes]= useState([])
const [description, setDescription] = useState({})
    const [formData, setFormData] = useState({title:'',mrp:'2000',sale_price:'2000',type:'',category:'',genderType:'',image:'',stock:'0'})
     const [error, setError] = useState({})
     const [response, setResponse] = useState({message:'',success:''})
     const iserror=()=>{
        let e = {}
          if(formData.title=='')
            e.title='Please Fill Title'
          if(formData.mrp=='')
            e.mrp='Please Fill MRP'
          if(formData.sale_price=='')
            e.sale_price='Please Fill Sale Price'
          if(formData.type=='')
            e.type='Please Fill Type'
          if(formData.category=='')
            e.category='Please Fill Category'
          if(formData.genderType=='')
            e.genderType='Please Fill Gender Type'
 
        if(formData.stock=='')
            e.stock='Please Fill Stock'
        if(formData.image=='')
            e.image='Please Select Image'
        else{
            let ext=formData.image.name.split('.')[1]
            if (ext!='jpg' && ext!='png' && ext!='jpeg')
                e.image='Please Select Only jpg,png, jpeg Image'
        }
        setError(e)
        if(Object.keys(e).length>0){
            return true
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("1")
        // setInsResponse(0)
        if(!iserror()){
            const data = new FormData()
            data.append("title", formData.title)
            data.append("mrp", formData.mrp)
            data.append("sale_price", formData.sale_price)
            data.append("type", formData.type)
            data.append("category", formData.category)
            data.append("image", formData.image)
            data.append("genderType", formData.genderType)
            data.append("stock", formData.stock)
            data.append("description", description)
            axios.post('http://localhost:3000/product',data)
            .then(res=>{
                setResponse(res.data)
                // setInsResponse(1)
            })
            .catch(err=>{console.error('Error'+err)})
        }
    }
 
useEffect(()=>{
axios.get("http://localhost:3000/category")
.then((res)=>{ console.log(res.data);
setCategory(res.data)})
.catch((err)=>{console.log(err)})

axios.get("http://localhost:3000/type")
.then((res)=>{ console.log(res.data);
 setTypes(res.data)})
.catch((err)=>{console.log(err)})

},[])
        
  return (
    <>
     <main className="p-5">
<div className="row justify-content-start">
    <div className="col-md-10 bg-light p-5">

        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-3">
             <label>Product Title</label>
             <input type="text" className="form-control mb-3" placeholder="Product Name"  value={formData.title}
onChange={(e)=>{setFormData({...formData,title:e.target.value})}}/>
<span className="text-danger small">{error.title}</span>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label>Product MRP</label>
                    <input type="number" className="form-control mb-3" min="500" max="20000" value={formData.mrp} onChange={(e)=>{setFormData({...formData,mrp:e.target.value})}} />
                </div>
                <div className="col">
                    <label>Sales Price</label>
                    <input type="number" className="form-control mb-3" min="500" max="20000" value={formData.sale_price} onChange={(e)=>{setFormData({...formData,sale_price:e.target.value})}}/>       
                </div>
            </div>
            <div className="mb-3">
                <label>Description</label>
                <Editor setContent={setDescription} text="Write Product Description ...."/>
                <span className="text-danger small">{error.description}</span>
               </div>
               <div className="row mb-3">
                <div className="col">
<label>Product Type</label>
<select className="form-select" onChange={(e)=>{setFormData({...formData,type:e.target.value})}} defaultValue={formData.type}>
<option value="" disabled selected>Choose Type</option>
{ types.map((t,i)=><option key={i}>{t.type}</option>) }
</select>
<span className="text-danger small">{error.type}</span>
                </div>
                <div className="col">
                    <label>Product Category</label>
                    <select className="form-select" onChange={(e)=>{setFormData({...formData,category:e.target.value})}} defaultValue={formData.category}>
                        <option value="" disabled selected>Choose Product</option>
                        { category.map((t,i)=><option key={i}>{t.category}</option>) }

                    </select>
                    <span className="text-danger small">{error.category}</span>
                </div>
                <div className="col">
                    <label>For</label>
                    <select className="form-select" onChange={(e)=>{setFormData({...formData,genderType:e.target.value})}} defaultValue={formData.genderType}>
                        <option value="" disabled selected>Choose Gender</option>
                        <option value="Women" >Women</option>
                        <option value="Men" >Men</option>
                    </select>
                    <span className="text-danger small">{error.genderType}</span>
                </div>
                </div>
                <div className="row mb-3">

                    <div className="col">
                        <label>Image</label>
                        <input type="file" className="form-control mb-3" onChange={(e)=>{setFormData({...formData,image:e.target.files[0]})}}/>
                        <span className="text-danger small">{error.image}</span>
                </div>
                <div className="col">
                    <label>Stock</label>
                    <input type="number" className="form-control mb-3" min="0" max="20" value={formData.stock} onChange={(e)=>{setFormData({...formData,stock:e.target.value})}}/>
                    <span className="text-danger small">{error.stock}</span>
                </div>
                <div className="col" style={{"paddingTop":"25px"}}>
                    <button type="submit" className="btn  px-5 bg-theme ">Save Product</button>

                </div>
                
                </div>
                <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
                {response.message}</p>
        </form>
    </div>

</div>
</main> 

    </>
  )
}

export default ProductForm
