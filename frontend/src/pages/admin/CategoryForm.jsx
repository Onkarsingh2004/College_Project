import React, { useState } from 'react'
import axios from "axios"
function CategoryForm({setInsResponse}) {
    const [formData, setFormData] = useState({category:'',image:''})
    const [error, setError] = useState({})
    const [response, setResponse] = useState({message:'',success:''})


    const iserror=()=>{
        let e = {}
        if(formData.category=='')
            e.category='Please Fill Category Name'

        if(formData.image=='')
            e.image='Please Fill Category Image'
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
        setInsResponse(0)
        if(!iserror()){
            const data = new FormData()
            data.append("category", formData.category)
            data.append("image", formData.image)
            axios.post('http://localhost:3000/category',data)
            .then(res=>{
                setResponse(res.data)
                setInsResponse(1)
            })
            .catch(err=>{console.error('Error'+err)})
        }
    }
return (
<>
<form onSubmit={(e)=>handleSubmit(e)}>
<div className="mb-3">
<label>Category Name</label>
<input type="text" className="form-control mb-3" placeholder=" Category Name" value={formData.category}
onChange={(e)=>{setFormData({...formData,category:e.target.value})}}/>
<span className="text-danger small">{error.category}</span>
</div>
<div className="mb-3">
<label>Category Image</label>
<input type="file" className="form-control mb-3" 
onChange={(e)=>{setFormData({...formData,image:e.target.files[0]})}}
/ >
<span className="text-danger small"> {error.image} </span>
</div>
<button type="submit" className="btn  px-5 bg-theme ">Save Category</button>

    <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
</form>
</>
)
}

export default CategoryForm
