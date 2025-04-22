const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const addressSchema = new mongoose.Schema({
    address: {type: String, required:true},
    area: {type: String, required:true},

    pincode: {type: String, required:true},
    contact_person: {type: String, required:true},
    
    contact_no: {type: Number, required:true},
    user: {type: String, required:true}
});

const address = mongoose.model('address', addressSchema)

module.exports=address