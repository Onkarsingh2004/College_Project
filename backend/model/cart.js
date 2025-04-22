const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const cartSchema = new mongoose.Schema({
    user: {type: String, required: true},
    product: {type: Object, required: true},
    qty: {type: Number, required:true},
    added_date: {type: Date, default:Date.now()},
    status: {type: String, default:'incart'},
    orderid: {type: String, default:null},
   
});

const cart = mongoose.model('cart', cartSchema)

module.exports=cart