const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const paymentSchema = new mongoose.Schema({
    orderCreationId: {type: String, required: true}, 
    razorpayPaymentId: {type: String, required:true},
    razorpayOrderId: {type: String, required: true}, 
    razorpaySignature: {type: String, required: true},     
    receipt: {type: String, required: true}, 
    amount: {type: String, required: true}, 
    order_date: {type: Date, default:Date.now()},
});

const payment = mongoose.model('payment', paymentSchema)

module.exports=payment