import React, { useState , useEffect } from 'react'
import axios from "axios"
import Banner from '../../Components/Banner'

function MyProfile() {
     const [formData, setFormData] = useState({first_name:'',last_name:'',phone:'',email:'',gender:"",dob:"",area:""})
            const [error, setError] = useState({})
            const [response, setResponse] = useState({message:'',success:''})
            const[userId,setUserId]= useState("")
            const iserror=()=>{
                let e={}
                 if(formData.first_name=='')
                    e.first_name='Please Fill First Name'
                 if(formData.last_name=='')
                    e.last_name='Please Fill Last Name'
                if(formData.phone=='')
                    e.phone='Please Enter Your Phone Number ';
                if(formData.email=='')
                    e.email='Please Enter Your Email';
                if(formData.gender=='')
                  e.gender='Select your Gender';
                if(formData.dob=='')
                  e.dob='Enter Your Date Of Birth';
                if(formData.area=='')
                  e.area='Select Your Area';
        
                setError(e)
                if(Object.keys(e).length>0){
                    return true
        }
    }
    useEffect(()=>{
        let uid=localStorage.getItem('userid')
        if(uid){
          setUserId(uid)
        axios.get("http://localhost:3000/user/profile/"+uid)
        .then((res)=>{ 
            
            setFormData(res.data)
        })
        .catch((err)=>{console.log(err)})
    }},[])


    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!iserror()){
            axios.put('http://localhost:3000/user/'+userId,formData)
            .then(res=>{
                setResponse(res.data)
            })
            .catch(err=>{console.error('Error'+err)})
        }
    }
  return (
    <>
    <Banner title={"My Profile"} pname="Profile"/>
    <main className="container py-5 border-theme mt-5 p-5 rounded">
        <form onSubmit={(e)=>handleSubmit(e)}>
    <h2 className="py-4"> Account Setting </h2>
    <div className="row mb-4">
        <div className="col">
            <input type="text" className="form-control border-0 border-bottom" placeholder="First Name"  value={formData.first_name}onChange={(e)=>{setFormData({...formData,first_name:e.target.value})}}/>
            <span className="text-danger small">{error.first_name}</span>
        </div>
        <div className="col">
            <input type="text" className="form-control border-0 border-bottom" placeholder="Last Name"  value={formData.last_name}onChange={(e)=>{setFormData({...formData,last_name:e.target.value})}}/>
            <span className="text-danger small">{error.last_name}</span>       
        </div>
        
    </div>


    <div className="row mb-4">
        <div className="col">
            
            <input type="text" className="form-control border-0 border-bottom" placeholder="Email" value={formData.email}onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
            <span className="text-danger small">{error.email}</span>
        </div>
        <div className="col">
            
            <input type="text" className="form-control border-0 border-bottom" placeholder="Phone" value={formData.phone}onChange={(e)=>{setFormData({...formData,phone:e.target.value})}}/>
            <span className="text-danger small">{error.phone}</span>       
        </div>
    </div>


    <div className="row mb-4">
        <div className="col">
            
            <input type="date" className="form-control border-0 border-bottom" placeholder="Date of Birth" 
            value={formData.dob.slice(0,10)} onChange={(e)=>{setFormData({...formData,dob:e.target.value})}}/>
            <span className="text-danger small">{error.dob}</span>

        </div>
        <div className="col">
           
            <select className="form-select border-0 border-bottom"  value={formData.gender} onChange={(e)=>{setFormData({...formData,gender:e.target.value})}}>
                <option value="" disabled >Choose Gender</option>
                <option value="Women" >Women</option>
                <option value="Men" >Men</option>
            </select>
        <span className="text-danger small">{error.gender}</span>
        </div>
    </div>


    <div className="row mb-4 ">
        <div className="col">
           
            <select className="form-select border-0 border-bottom"  value={formData.area} onChange={(e)=>{setFormData({...formData,area:e.target.value})}}>
                <option value="" disabled >Choose City</option>
                <option value="Amritsar" >Amritsar</option>
                <option value="Banglore" >Banglore</option>
            </select>
            <span className="text-danger small">{error.area}</span>
        </div>

        <div className="col">
            <button type="submit" className="btn bg-light w-100">Update Profile</button>
            <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
        </div>
    </div>
    </form>
</main>
</>
  )
}

export default MyProfile
