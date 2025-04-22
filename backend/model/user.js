const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const userSchema = new mongoose.Schema({
    first_name: {type: String, required:true},
    last_name: {type: String, required: true},
    
    email: {type: String, required:true,unique:true},
    phone: {type: String, required:true},
    
    DOB: {type:Date , default:null},
    gender: {type: String, default:null},
    
    area: {type: String, default:null},

    password: {type: String, required:true},
    reg_date: {type: Date, default:Date.now()},
});

const user = mongoose.model('user', userSchema)

module.exports=user