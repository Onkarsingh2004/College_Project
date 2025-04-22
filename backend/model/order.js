const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const orderSchema = new mongoose.Schema({
    user: {type: String, required: true},
    address: {type: Object, required: true},
    amount: {type: Number, required: true},
    charges: {type: Number, required:true},
    mode: {type: String, required: true},
    order_date: {type: Date, default:Date.now()},
    status: {type: String, required:true},
   
});

const order = mongoose.model('order', orderSchema)

module.exports=order