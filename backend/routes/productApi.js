const express = require('express')
const Product = require('./../model/product')
const router = express.Router()
const imgUpload= require('./../middleware/image_upload')

router.get('/id/:id', (req, res) => {
  Product.findOne({_id:req.params.id}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })

router.get('/category/:category', (req, res) => {
Product.find({category:req.params.category}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})

router.get('/type/:type', (req, res) => {
Product.find({type:req.params.type}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})
router.get('/genderType/:genderType', (req, res) => {
Product.find({genderType:req.params.genderType}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})
router.get('/price/:min/:max', (req, res) => {
console.log(req.params.min)
Product.find({sale_price:{$gte:req.params.min,$lte:req.params.max}}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})

  router.get('/', (req, res) => {
    Product.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })

  router.get('/latest', (req, res) => {
    Product.find().sort({added_date:-1}).limit(8).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })

  router.post('/',imgUpload.single('image'), (req, res) => {
    let b=req.body;
    let data={
      title:b.title,
      mrp:b.mrp,
      sale_price:b.sale_price,
      description:b.description,
      image:req.file.originalname,
      category:b.category,
      type:b.type,
      genderType:b.genderType,
      stock:b.stock
      
    }
    console.log(data)
    const rec = new Product(data);
    rec.save()
    .then(() =>   res.send({'message':'Record Saved ','success':true}) )
    .catch((err)=> { console.log(err);
     res.send({'message':'Some Error Occured ','success':false}) } )
  })

  router.delete('/:id', (req, res) => {
    Product.deleteOne({_id:req.params.id}).then((res.send({'message':'Record Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
    })

    router.put('/:id', (req, res) => {
      let b=req.body;
      let data={
        title:b.title,
        mrp:b.mrp,
        sale_price:b.sale_price,
        description:b.description,
        category:b.category,
        type:b.type 
      }
      Product.updateOne({_id:req.params.id},data).then((res.send({'message':'Record Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })

    router.put('/image/:id',imgUpload.single('image'), (req, res) => {
  
      let data={
        image:req.file.originalname
      }
      Product.updateOne({_id:req.params.id},data).then((res.send({'message':'Record Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })








      
    // for develop
    router.delete('/', (req, res) => {
      Product.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
  
  module.exports = router
  
