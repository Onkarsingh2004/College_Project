const express = require('express')
const Admin = require('./../model/admin')
const router = express.Router()
const bcrypt = require('bcrypt');

  
router.post('/login', (req, res) => {
  let b=req.body;
  Admin.findOne({email:b.email})
  .then(admin=>{
  if(!admin){
    res.send({'message':'Incorrect Email','success':false,'user':null})
  }
  else{
    if(bcrypt.compareSync(b.password,admin.password)==false)
      res.send({'message':'Incorrect Password','success':false,'user':null})
      else
      res.send({'message':'Login Success','success':true,'admin':{adminId:admin._id,email:admin.email}})
  }
  })
  .catch(err=>{
  console.log(err);
  res.send("Some Error Occured")
  })
  })

// for develop

router.post('/', (req, res) => {
let b=req.body;
let pw=bcrypt.hashSync(b.password,10)
let data={
email:b.email,
password:pw
}
const rec = new Admin(data);
rec.save()
.then(() =>   res.send({'message':'Record Saved ','success':true}) )
.catch((err)=> res.send({'message':'Some Error Occured ','success':false}))
})

router.get('/', (req, res) => {
  Admin.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
  })

  
router.delete('/', (req, res) => {
  Admin.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
  })

  module.exports = router
  
