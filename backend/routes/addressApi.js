const express = require('express')
const Address = require('./../model/address')
const router = express.Router()

router.get('/id/:id', (req, res) => {
Address.findOne({_id:req.params.id}).then((data=>res.send(data))).catch(err=>res.send("Some Error Occured"))
})

router.get('/:user', (req, res) => {
Address.find({user:req.params.user}).then((data=>res.send(data))).catch(err=>{console.log(err),res.send("Some Error Occured")})
})


router.post('/:user', (req, res) => {
let b=req.body;
let data={
address:b.address,
area:b.area,
pincode:b.pincode,
contact_person:b.contact_person,
contact_no:b.contact_no,
user:req.params.user
}
console.log(data)
const rec = new Address(data);
rec.save()
.then(() =>   res.send({'message':'Record Saved ','success':true}) )
.catch((err)=>{console.log(err), res.send({'message':'Some Error Occured ','success':false})})
})

router.delete('/:id', (req, res) => {
Address.deleteOne({_id:req.params.id}).then((res.send({'message':'Record Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
})


router.put('/:id', (req, res) => {
let b=req.body;
let data={
address:b.address,
area:b.area,
pincode:b.pincode,
contact_person:b.contact_person,
contact_no:b.contact_no,
user:b.user
}
Address.updateOne({_id:req.params.id},data).then((res.send({'message':'Record Is Updated','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
})

// for develop
router.delete('/', (req, res) => {
Address.deleteMany({}).then((res.send({'message':'Records Is Deleted','success':true}))).catch(err=>res.send({'message':'Some Error Occured ','success':false}))
})


module.exports = router

