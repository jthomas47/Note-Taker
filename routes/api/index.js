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

// DELETE route for deleting a specific note
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id; 
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      fs.writeFile('./db/db.json',
      JSON.stringify(result),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully deleted!'))
    }); 
});


// POST route for adding a new note
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
            
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!'))
            }
        })

        const response = {
            status: 'success',
            body: newNote,
          };
      
          console.log(response);
          res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
      }
    

});


module.exports = router; 
