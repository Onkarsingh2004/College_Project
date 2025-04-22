const express = require('express')
const cors= require('cors')
const path=require('path')
const app = express()
require('dotenv').config()

const port = process.env.PORT
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cors({origin:'*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.get('/', (req, res) => {
  res.send('Jewellary Shop')
})

const category = require('./routes/categoryApi')
app.use('/category', category)

const address = require('./routes/addressApi')
app.use('/address', address)

const admin = require('./routes/adminApi')
app.use('/admin', admin)

const cart = require('./routes/cartApi')
app.use('/cart', cart)

const order = require('./routes/orderApi')
app.use('/order', order)

const payment = require('./routes/paymentApi')
app.use('/payment', payment)

const product = require('./routes/productApi')
app.use('/product', product)

const user = require('./routes/userApi')
app.use('/user', user)

const contact = require('./routes/contactApi')
app.use('/contact', contact)

const type = require('./routes/typeApi')
app.use('/type', type)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      