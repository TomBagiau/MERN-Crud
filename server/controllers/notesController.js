const Note = require('../models/note');

const fetchNotes = async (req, res) => {
    //find notes using mongoose
    const notes = await Note.find()

    //respond with them
    res.json({ notes })
}

const fetchNote = async (req, res) => {
    //get id of the URL
    const noteId = req.params.id

    //Find the note using that id 
    const note = await Note.findById(noteId)

    //Respond with the note
    res.json({note})
}

const createNote = async (req, res) => {
    //Get the sent in data off request body
    const {title, body} = req.body

    //Create a note with it 
    const note = await Note.create({
        title,
        body,
    })

    //respond with the note
    res.json({note})
}

const updateNote = async (req, res) => {
    //Get the id of the url 
    const noteId = req.params.id

    //Get datas of request body 
    const {title, body} = req.body

    //Find and update 
    await Note.findByIdAndUpdate(noteId, {
        title,
        body,
    })

    //Find updated note
    const note = await Note.findById(noteId)

    //Respond with it
    res.json({ note })
}

const deleteNote = async (req, res) => {
    //Get the id of the url 
    const noteId = req.params.id

    //delete the note
    await Note.deleteOne({ _id: noteId })

    //respond
    res.json({ success: "Note deleted" })
}

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
}