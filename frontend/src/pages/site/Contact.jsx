import React, { useState } from 'react'
import axios from "axios"
import {Link} from 'react-router'
import Banner from '../../Components/Banner'

function Contact() {
  const [formData, setFormData] = useState({name:'',email:'',phone_no:'',message:''})
  const [error, setError] = useState({})
  const [response, setResponse] = useState({message:'',success:''})
  
  const iserror=()=>{
      let e={}
       if(formData.name=='')
          e.name='Please Fill Your Name'
      
      if(formData.email=='')
          e.email='Please Enter Your Email Address ';

      if(formData.phone_no=='')
          e.phone_no='Please Enter Your Contact No';

      if(formData.message=='')
        e.message='Please Enter Your Message';
      setError(e)
      if(Object.keys(e).length>0){
          return true
}
  }

  const handleSubmit=(e)=>{
      e.preventDefault()
      if(!iserror()){
          axios.post('http://localhost:3000/contact',formData)
          .then(res=>{
              setResponse(res.data)
          })
          .catch(err=>{console.error('Error'+err)})
      }
  }
  return (
    <>
    <Banner title="Get In Touch" pname="Contact"/>


      <main className="container m-5 p-4">
        <div className="row justify-content-between">
          <div className="col-md-3 border-end border-success lh-lg">
            <h4 className="text-light">Address</h4>
            <p>644 Majitha Road, Amritsar Punjab</p>
            <h4 className="text-light">Phone</h4>
            <p>9803084620</p>
            <h4 className="text-light">Email</h4>
            <p>glamsphere.asr@gmail.com</p>
            <h4 className="text-light">Social Media</h4>
            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook pe-2 text-dark"></i>
            </Link>
            <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-youtube pe-2 text-dark"></i>
            </Link>
            <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram pe-2 text-dark"></i>
            </Link>
            <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin text-dark"></i>
            </Link>
          </div>

          <div className="col-md-8">
            <form onSubmit={(e)=>handleSubmit(e)}>
            <h2 className="mb-3 display-4">Tell Us Your Message</h2>
            <div>
            <input type="text" className="form-control mb-3" placeholder="Your Name" value={formData.name}onChange={(e)=>{setFormData({...formData,name:e.target.value})}} />
            <span className="text-danger small">{error.name}</span>
            </div>
            <div>
            <input type="email" className="form-control mb-3" placeholder="Your Email" value={formData.email}onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
            <span className="text-danger small">{error.email}</span> 
            </div>
            <div>
            <input type="phone" className="form-control mb-3" placeholder="Phone No" value={formData.phone_no}onChange={(e)=>{setFormData({...formData,phone_no:e.target.value})}}/>
            <span className="text-danger small">{error.phone_no}</span>
            </div>
          <div>
            <textarea className="form-control mb-3" rows="4" placeholder="Your Message" value={formData.message}onChange={(e)=>{setFormData({...formData,message:e.target.value})}}></textarea>
            <span className="text-danger small">{error.message}</span>
            </div>

            <button className="btn bg-light shadow rounded">
              Send
            </button>
            <p className={response.success ? "text-success pt-3" : "text-danger pt-3"}>
        {response.message}
    </p>
            </form>
          </div>
        </div>
      </main>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13575.402771111701!2d74.94064694924316!3d31.719973306395282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919635b3ee74d5b%3A0x9fc0da45f920b245!2sMajitha%20Rd%2C%20Punjab!5e0!3m2!1sen!2sin!4v1739358687251!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </>
  );
}

export default Contact;
