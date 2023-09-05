const router = require('express').Router();
const fs = require('fs');
const util = require('util'); 
const readFromFile = util.promisify(fs.readFile);
const { v4: uuidv4 } = require('uuid');

// GET route for retrieving all notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// GET route for retrieving a specific note
router.get('/notes/:id', (req, res) => {
    const noteId = req.params.id; 
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
    
});
