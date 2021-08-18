const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

require('./db/db_connection')

const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const app = express()

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use('/user', userRoute)
app.use(productRoute)

app.listen(3000)