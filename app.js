const express = require('express')

require('./db/db_connection')

const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const app = express()

app.use(userRoute)
app.use(productRoute)
app.listen(90)