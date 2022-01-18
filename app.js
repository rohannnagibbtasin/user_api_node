const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

mongoose.connect(process.env.MONGO_URL, {}, ()=>{
    console.log('connected to mongodb');
});

app.use('/api/auth', authRoute);

app.listen(process.env.PORT,() => {
    console.log(`http://localhost:${process.env.PORT}`);
})