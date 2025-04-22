const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB);

const typeSchema = new mongoose.Schema({

    type: {type: String, required:true},
    image: {type: String, required:true},
});

const Type= mongoose.model('Type', typeSchema)

module.exports = Type