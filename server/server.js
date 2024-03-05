//Load .env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const dbConnect = require('./config/dbConnect');

//Create express app
const app = express();

//connect to Db
dbConnect()

//Routing 
app.get('/', (req, res) => {
    res.json({ hello: 'world' });
})

//Start server 
app.listen(process.env.PORT);