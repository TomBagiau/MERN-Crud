//Load .env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const dbConnect = require('./config/dbConnect');
const notesController = require('./controllers/notesController')

//Create express app
const app = express();

//Configure express
app.use(express.json())

//Connect to Db
dbConnect()

//Routing 
app.get('/notes', notesController.fetchNotes)

app.get('/notes/:id', notesController.fetchNote)

app.post('/notes', notesController.createNote)

app.put('/notes/:id', notesController.updateNote)

app.delete('/notes/:id', notesController.deleteNote)

//Start server 
app.listen(process.env.PORT);