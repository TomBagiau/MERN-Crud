//Load .env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const dbConnect = require('./config/dbConnect');
const Note = require('./models/note');

//Create express app
const app = express();

//Configure express
app.use(express.json())

//Connect to Db
dbConnect()

//Routing 
app.get('/', (req, res) => {
    res.json({ hello: 'world' });
})

app.get('/notes', async (req, res) => {
    //find notes using mongoose
    const notes = await Note.find()

    //respond with them
    res.json({ notes: notes })
})

app.get('/notes/:id', async (req, res) => {
    //get id of the URL
    const noteId = req.params.id

    //Find the note using that id 
    const note = await Note.findById(noteId)

    //Respond with the note
    res.json({note: note})
})

app.post('/notes', async (req, res) => {
    //Get the sent in data off request body
    const title = req.body.title
    const body = req.body.body

    //Create a note with it 
    const note = await Note.create({
        title: title,
        body: body,
    })

    //respond with the note
    res.json({note: note})
})

app.put('/notes/:id', async (req, res) => {
    //Get the id of the url 
    const noteId = req.params.id

    //Get datas of request body 
    const title = req.body.title
    const body = req.body.body

    //Find and update 
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    })

    //Find updated note
    const note = await Note.findById(noteId)

    //Respond with it
    res.json({ note: note })
})

app.delete('/notes/:id', async (req, res) => {
    //Get the id of the url 
    const noteId = req.params.id

    //delete the note
    await Note.deleteOne({ _id: noteId })

    //respond
    res.json({ success: "Note deleted" })
})

//Start server 
app.listen(process.env.PORT);