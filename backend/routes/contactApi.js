const express = require('express')
const Contact = require('./../model/contact')
const mailer = require('./../middleware/mailer')
const router = express.Router()


  router.get('/', (req, res) => {
    Contact.find({}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
    })
  

  router.post('/',(req, res) => {
    let b=req.body;
    let data={
      name:b.name,
      email:b.email,
      phone_no:b.phone_no,
      message:b.message  
    }
    const rec = new Contact(data);
   rec.save()
   .then(() =>  {
     msg=`<h2>Hi  ${b.name} </h2><p>Thank you for your interest in Glam Sphere!<p><p>We received your inquiry.We appreciate you taking the time to contact us.</p><p>We are currently reviewing your message and will get back to you with a detailed response within 2-3 business days.</p>
     <p>Regards</p>
     <p>Glam Shphere</p>`;
     mailer.main(b.email,"Your Recent Inquiry at Glam Sphere!",msg).catch(console.error);  
     res.send({'message':'Record Saved ','success':true}) 
   }) 
   .catch((err)=> res.send({'message':'Some Error Occured ','success':false}))
   })

    // for develop
    router.delete('/', (req, res) => {
      Contact.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })

  
  module.exports = router
  
