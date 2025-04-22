const express = require('express')
const Category = require('./../model/category')
const router = express.Router()
const imgUpload= require('./../middleware/image_upload')

// get all categories
router.get('/', (req, res) => {
  Category.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })

 //save category 
router.post('/',imgUpload.single('image'), (req, res) => {
    let b=req.body;
    let data={
      category:b.category, 
      image:req.file.originalname
    }
    const rec = new Category(data);
    rec.save()
    .then(() =>   res.send({'message':'Record Saved ','success':true}) )
    .catch((err)=> res.send({'message':'Some Error Occured ','success':false}))
  })



  router.delete('/:id', (req, res) => {
    Category.deleteOne({_id:req.params.id}).then((res.send({'message':'Record Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
    })


    
    // for develop
    router.delete('/', (req, res) => {
      Category.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
  
  module.exports = router
  
