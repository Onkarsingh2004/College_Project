const express = require('express')
const Cart = require('./../model/cart')
const router = express.Router()

router.post('/', (req, res) => {
  let b=req.body;
  let data={
    user:b.user,
    product:b.product,
    qty:b.qty
  }
  const rec = new Cart(data);
  rec.save()
  .then(() =>   res.send({'message':'Record Saved ','success':true}) )
  .catch((err)=> res.send({'message':'Some Error Occured ','success':false}))
})


  router.get('/:user', (req, res) => {
    Cart.find({user:req.params.user, status:'incart'}).then((data=> {
      var summary= {total:0, net:0}
      data.forEach((y)=>{
        summary.net+=(y.qty*y.product.sale_price)
        summary.total+=(y.qty*y.product.mrp)
      })
      summary.discount=summary.total-summary.net
      res.send({'response':data, 'status':true, 'summary':summary})
    })).catch(()=>res.send({'response':'Error In Code','status': false}))
    })
  

  router.get('/count/:user', (req, res) => {
    Cart.find({user:req.params.user, status:'incart'})
    .then((data)=>{res.send({'response':data.length,'status':true})
  }).catch(()=>res.send({'response':'Error In Code', 'status':false}))
  })
  

  router.get('/orderitems/:id', (req, res) => {
    Cart.find({
      orderid:req.params.id
    })
    .then((data)=>{
      if(data){
        res.send({'response':data,'status':true})
      }
      else{
        res.send({'response':false, 'status':false})
      }
    }).catch(()=>res.send({'response':'Error In Code','status':false}))
  })

  router.get('/incart/:id/:user', (req, res) => {
    Cart.findOne({
      product_id:req.params.id,
      user:req.params.user, 
      status:'incart'
    })
    .then((data)=>{
      if(data){
        res.send({'response':true,'status':true})
      }
      else{
        res.send({'response':false, 'status':false})
      }
    }).catch(()=>res.send({'response':'Error In Code','status':false}))
  })
  
  router.delete('/:id', (req, res) => {
    Cart.deleteOne({_id:req.params.id}).then((res.send({'message':'Record Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
    })



    router.put('/:id', (req, res) => {
      let b=req.body;
      let data={
       qty:b.qty
      }
      Cart.updateOne({_id:req.params.id},data)
      .then((res.send({'message':'Record Is Updated','success':true})))
      .catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })



      router.put('/status/:id', (req, res) => {
        let b=req.body;
        let data={
         status:b.status
        }
        Cart.updateOne({_id:req.params.id},data).then((res.send({'message':'Record Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
        })

        router.put('/ordered/:user', (req, res) => {
          let user=req.params.user
          let b=req.body
          let data={status:b.status,orderid:b.orderid}
          Cart.updateMany({user:user,status:'incart'},data)
          .then((data) => res.send({'response':'Record Updated','status':true}))
          .catch((err)=> res.send({'response':'Error In Code','status':false}));
          })

    // for develop
    router.delete('/', (req, res) => {
      Cart.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
router.get('/', (req, res) => {
Cart.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})


  
  
  module.exports = router
  
