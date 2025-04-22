const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const productSchema = new mongoose.Schema({
    title: {type: String, required:true},
    mrp: {type: Number, required:true},
    sale_price: {type: Number, required:true},
    description: {type: String, required:true},
    
    type: {type: String, required:true},
    category: {type: String, required:true},
    genderType: {type: String, required:true},

    image: {type: String, required:true},
    stock: {type: Number, default:true},

    added_date: {type: Date, default:Date.now()}
});

const product = mongoose.model('product', productSchema)

module.exports=product