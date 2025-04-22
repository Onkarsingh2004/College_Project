const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const categorySchema = new mongoose.Schema({

    category: {type: String, required:true},
    image: {type: String, required:true},
});

const category= mongoose.model('Category', categorySchema)

module.exports = category