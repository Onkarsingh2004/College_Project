const express = require('express')
const Order = require('./../model/order')
const router = express.Router()
const mail = require('./../middleware/mailer')

router.get("/", (req,res)=>{
  Order.find({status:{$ne:'Delivered'}})
  .then((data)=>res.send(data))
  .catch(()=>res.send({'response':'Error In Code', 'status':false}))
})
router.get("/prev", (req,res)=>{
  Order.find({status:'Delivered'})
  .then((data)=>res.send(data))
  .catch(()=>res.send({'response':'Error In Code', 'status':false}))
})
router.get("/user/:user", (req,res)=>{
  Order.find({user:req.params.user})
  .then((data)=>res.send(data))
  .catch(()=>res.send({'response':'Error In Code', 'status':false}))
})

router.get("/:orderid", (req,res)=>{
  Order.findOne({_id:req.params.orderid})
  .then((data)=>res.send(data))
  .catch(()=>res.send({'response':'Error In Code', 'status':false}))
})

router.post('/', (req, res) => {
  let b = req.body;
  
  let data = {
      address: b.address,
      amount: b.amount,
      user: b.user,
      mode: b.mode,
      charges: b.charges,
      status: b.status
  };

  const rec = new Order(data);
  rec.save()
      .then((doc) => {
          let msg = `
              <strong>Dear User,</strong>
              <p>Thank you for placing an order with GlamSphere.</p>
              <p>We are pleased to confirm the receipt of your order dated ${new Date().toLocaleString()}.</p>
              <p>Your order is now being processed, and we will ensure its prompt dispatch.</p>
              <p>Sincerely,</p>
              <p>The GlamSphere Team</p>
          `;


          mail.main(b.email,'Order Placed',msg).catch(console.error);

          res.send({
              response: 'Order Placed Successfully',
              status: true,
              docid: doc._id,
              doc: doc
          });
      })
      .catch((err) => {
        console.log(err)
  
          res.send({
              response: 'Error In Code',
              status: false
          })}
      );

});


  router.delete('/:id', (req, res) => {
    let id = req.params.id
    Order.deleteOne({_id:id}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
    })

    router.put('/:id', (req, res) => {
      let id=req.params.id
      let b=req.body
      let data={status:b.status}
      Order.updateOne({_id:id},data)
      .then((data) => res.send({'response':'Record Updated','status':true}))
      .catch((err)=> res.send({'response':'Error In Code','status':false}));
      })
      





  
    // for develop
    router.delete('/', (req, res) => {
      Order.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
  
  module.exports = router
  
