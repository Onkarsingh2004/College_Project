import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../../context/CartContext'
import { Link , useNavigate } from 'react-router'
import Banner from '../../Components/Banner'

function Checkout() {
  const [cartSummary, setCartSummary]=useState({total:0, discount:0,net:0})
  const [address,setAddress]=useState([])
  const [formData, setFormData] = useState({address:{} ,status:'', charges:0,user:'',email:''})
  const [error, setError] = useState({address:''})
  const [response,setResponse]=useState({response:'',status:''})
  const {cartItems,setCartItems}=useCart()
  const navigate = useNavigate()

  let iserror=()=>{
    let e={}
    if(Object.keys(formData.address).length<=0)
    e.address='Please Select  Address ';
    setError(e)
    if(Object.keys(e).length>0){
    return true
    }
    }

    const handleSubmit=(e)=>{
      e.preventDefault(); 
      console.log(formData)    
   
      if(!iserror()){
      axios.post('http://localhost:3000/order', formData)
      .then(res => { 
      let doc=res.data.doc 
      let docId=res.data.docid
      axios.put('http://localhost:3000/cart/ordered/'+formData.user, {status:'ordered',orderid:docId})
      .then((resp)=>{
      if(resp.data.status){
      setResponse({response:resp.data.response,status:'success'})
      setCartItems(0)
      setTimeout(()=>{navigate('/confirm',{state: doc})},1000)
      }
      })
      })
      .catch(err => console.log(err))
      .catch(err =>{ console.error('Error'+err)})
      }
      }
      
      
    
   useEffect(()=>{
    let userid= localStorage.getItem('userid')
    let useremail= localStorage.getItem('useremail')
    if(userid){
     
    axios.get('http://localhost:3000/cart/'+userid)
    .then((res)=>{
      setCartSummary(res.data.summary)
      let c=res.data.summary.net<1200?0:75;
      setFormData({...formData,email:useremail,user:userid,charges:c,mode:"cash",amount:res.data.summary.net,status:'ordered'})

        })
    
    .catch((err)=>{console.log(err)})
    axios.get('http://localhost:3000/address/'+userid)
    .then((res)=>{
      setAddress(res.data)
    })
    .catch((err)=>{console.log(err)})
  }
   },[])
  return (
    <div>
       <Banner title="Checkout" pname="Checkout"/>
<div className="container p-4">
       <span className='text-danger small'>{error.address && error.address}</span> <br />

<form onSubmit={(e)=>handleSubmit(e)}>

       <div className="row py-4">
        <div className="col-md-8">
        <div className="text-end">
<Link className='text-dark text-decoration-none' to="/user/address">   
+ Add New Address</Link>
</div>
<h2>Select Address</h2>
{   address.length>0 ? 
<div className="row py-3"> {
address.map((row,index)=>{
return <div className="col-md-6" key={index}>

<input type="radio" className="btn-check" id={row._id} name='address'
value={index} onChange={(e)=>setFormData({...formData,address:address[e.target.value]})}
defaultChecked={formData.address._id==row._id && true}/>
<label className="btn btn-outline-dark rounded-0 w-100 py-4" htmlFor={row._id}>
<p>{row.contact_person} ({row.contact_no})</p>
<p>{row.address}, {row.area} , {row.pincode}</p>
</label>
</div>
})
}
</div> :
<p className='text-muted py-5'>No Address Found </p>
}

        </div>
        <div className="col-md-4">
        <div className="bg-light p-4">
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
                    <tr className='lh-lg border-bottom border-dark'>
                      <th>Net:</th>
                      <td>{cartSummary.net}</td>
                    </tr>
                    <tr className='lh-lg border-bottom border-dark'>
                      <th>Charges:</th>
                      <td>{formData.charges}</td>
                    </tr>
                    <tr className='lh-lg'>
                      <th>Amount To Be Paid</th>
                      <td>{cartSummary.net+formData.charges}</td>
                    </tr>
                  </tbody>
                </table>
                <button className='btn bg-theme w-100 mt-3 '>Place Order</button>
        </div>
        </div>
       </div>
</form>
</div>
    </div>
  )
}

export default Checkout
