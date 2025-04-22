const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const adminSchema = new mongoose.Schema({

    email: {type: String, required:true},
    password: {type: String, required:true},
});

const Admin= mongoose.model('Admin', adminSchema)

module.exports = Admin
