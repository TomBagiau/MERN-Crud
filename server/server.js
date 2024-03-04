//Load .env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');

//Create express app
const app = express();

//Routing 
app.get('/', (req, res) => {
    res.json({ hello: 'world' });
})

//Start server 
app.listen(process.env.PORT);