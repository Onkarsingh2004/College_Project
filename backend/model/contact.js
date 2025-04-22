const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const contactSchema = new mongoose.Schema({

    name: {type: String, required:true},
    email: {type: String, required:true}, 
    phone_no: {type: Number, required:true}, 
    message: {type: String, default:null},
    Date: {type: Date, default:Date.now()},
});

const contact= mongoose.model('Contact', contactSchema)

module.exports = contact