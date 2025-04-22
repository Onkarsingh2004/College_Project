const express = require('express')
const router = express.Router()
const imgUpload= require('./../middleware/image_upload')
const Type = require('./../model/type')
router.get('/', (req, res) => {
  Type.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })

  
  router.post('/',imgUpload.single('image'), (req, res) => {
    let b=req.body;
    let data={
      type:b.type, 
      image:req.file.originalname
    }
    const rec = new Type(data);
    rec.save()
    .then(() =>   res.send({'message':'Record Saved ','success':true}) )
    .catch((err)=> res.send({'message':'Some Error Occured ','success':false}))
  })



  router.delete('/:id', (req, res) => {
    Type.deleteOne({_id:req.params.id}).then((res.send({'message':'Record Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
    })





    
    // for develop
    router.delete('/', (req, res) => {
      Type.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
  
  module.exports = router
  
