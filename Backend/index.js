require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const bcrypt = require("bcrypt");
const cookieParser= require('cookie-parser')
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

app.use(
  cors({
    origin: ['https://directhire-1.onrender.com',"http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Include PATCH method
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// const routes = require('./routes/routes');
const routes1 = require('./routes/labourpost');
const routes2 = require('./routes/workpost');
const routes3 = require('./routes/contact');
const routes4 = require('./routes/payment');
const routes5 = require('./routes/payment')
const getuser = require('./controllers/getuserController')
const user = require('./routes/user')
app.use(cookieParser());
app.use('/api' ,routes1 ,routes2 ,routes3 ,routes4,routes5,user);
app.use('/api',getuser)
app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})









