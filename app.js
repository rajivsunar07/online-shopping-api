const express = require('express')

require('./db/db_connection')

const userRoute = require('./routes/user')
const app = express()

app.use(userRoute)
app.listen(90)