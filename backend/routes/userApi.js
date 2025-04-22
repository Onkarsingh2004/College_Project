const express = require('express')
const User = require('./../model/user')
const router = express.Router()
const bcrypt = require('bcrypt');
const mailer = require('./../middleware/mailer')

router.get('/profile/:id', (req, res) => {
User.findOne({_id:req.params.id}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})

router.get('/', (req, res) => {
User.find().then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})

router.post('/register', (req, res) => {
let b=req.body;
let pw=bcrypt.hashSync(b.password,10)
let data={
email:b.email,
phone:b.phone,
password:pw,
first_name:b.first_name,
last_name:b.last_name
}
const rec = new User(data);
rec.save()
.then(() =>  {
  msg="<h2>Hi "+ b.first_name +" "+ b.last_name +" !</h2><p>Welcome to the world of dazzling jewellery! We're thrilled to have you join our community of sparkle enthusiasts.</p><p>We're passionate about bringing you the most exquisite and on-trend pieces, from delicate necklaces and elegant earrings to stunning bracelets and statement rings.  Whether you're looking for a timeless classic or a contemporary design, we're confident you'll find something you love in our collection.</p>";
  mailer.main(b.email,"Welcome To Glam Sphere",msg).catch(console.error);  
  res.send({'message':'Record Saved ','success':true}) 
}) 
.catch((err)=> { console.log(err); res.send({'message':'Some Error Occured ','success':false})})
})

router.post('/login', (req, res) => {
let b=req.body;
User.findOne({
  email:b.email
})
.then(user=>{
if(!user){
  res.send({'message':'Incorrect Email','success':false,'user':null})
}
else{
  if(bcrypt.compareSync(b.password,user.password)==false)
    res.send({'message':'Incorrect Password','success':false,'user':null})
    else
    res.send({'message':'Login Success','success':true,'user':{userId:user._id,email:user.email,name:user.first_name}})
}
})
.catch(err=>{
console.log(err);
res.send("Some Error Occured")
})
})

router.post('/forgot', (req, res) => {
  let b = req.body;
  User.findOne({email:b.email})
.then(user=>{
if(!user){
  res.send({'message':'Incorrect Email','success':false,'user':null})
}
else{
  let random = Math. floor(Math. random() * (9999 - 1234 + 1)) + 1234;
 msg = `
  <h2>Hi ${user.first_name} ${user.last_name}!</h2>
  <p>We've received a request to reset your password for your account.</p>
  <p>To verify your identity and proceed with the password reset, please enter the following 
  One-Time Password (OTP) into the designated field on our password reset page:</p>
  <p><b>OTP: ${random}</b></p>
  <p>Regards</p>
  <p>Glam Shphere</p>
`;
  mailer.main(b.email,"Password Recovery",msg).catch(console.error);  
  res.send({'message':'Mail Sended ','success':true,'random':random}) 
}
})
})

  router.put('/:id', (req, res) => {
    let b=req.body;
    let data={
      email:b.email,
      gender:b.gender,
      dob:b.dob,
      area:b.area,
      phone:b.phone,
      first_name:b.first_name,
      last_name:b.last_name
    }
    console.log(data)
    User.updateOne({_id:req.params.id},data).then((res.send({'message':'Record Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
    })



    router.put('/password/:id', (req, res) => {
      let b=req.body;
      let pw=bcrypt.hashSync(b.password,10)
      User.updateOne({_id:req.params.id},{password:pw}).then((res.send({'message':'Password Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })

      router.put('/resetpassword/:email', (req, res) => {
        let b=req.body;
        let pw=bcrypt.hashSync(b.password,10)
        User.updateOne({email:req.params.email},{password:pw}).then((res.send({'message':'Password Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
        })
      
    // for develop
    router.delete('/', (req, res) => {
      User.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
      })
  
  module.exports = router
  
