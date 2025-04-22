const express = require('express')
const Payment = require('./../model/payment')
const router = express.Router()

router.get('/', (req, res) => {
  Payment.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })


  router.post('/', (req, res) => {
    let b=req.body;
    let data={
      orderCreationId:b.orderCreationId,
      razorpayPaymentId:b.razorpayPaymentId,
      razorpayOrderId:b.razorpayOrderId,
      razorpaySignature:b.razorpaySignature,
      receipt:b.receipt,
      amount:b.amount
    }
    const rec = new Payment(data);
    rec.save()
    .then(() =>   res.send({'message':'Record Saved ','success':true}) )
    .catch((err)=> res.send({'message':'Some Error Occured ','success':false}))
  })
  








  
    // for develop
    router.delete('/', (req, res) => {
      Payment.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
  module.exports = router
  
