//Importing all of the necessary modules
const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
const db = require("./db/db.json");

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Port assignment that will default to 3001 unless assigned a port number by Heroku
const PORT = process.env.PORT || 3001;



//Sends the homepage 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

//Sends the notes page
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });


//Renders the notes from the JSON database
app.get('/api/notes', (req, res) => {
  res.json(db);
})

//function that takes the note object and adds a unique id number to it using Math.Random and then pushes it to the database and the updated database to the JSON file. 
function updateDatabase(note, database){
  const newNote = note;
  note.id = Math.floor(Math.random() * 1000)
  database.push(newNote);
  fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(database, null, 4), (err) =>{
    if (err) {
      console.log(err)
    }
  }
  );
}

//Deletes the chosen note. Gets id from the body parameters in the delete request and then uses a for loop to delete the object with the same id from the database and overwrites the database minus the deleted object. 
function deleteNote(id, database){
  for (i=0; i<database.length; i++){
    idNum = Number(id)
    if (idNum === database[i].id) {
      database.splice(i, 1)
      fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(database, null, 4), (err) => {
        if (err) {
          console.log(err)
        }
      })
      break
    }
  }
}

//Delete request, sets noteId to the id extracted from req.params.id then uses that to call deleteNote function. Then sends to update the page.
app.delete('/api/notes/:id', (req, res) => {
  noteId = req.params.id
  deleteNote(noteId, db)
  res.send()
})

//Post request, sets newNote = req.body to access properties set in index.js and then passes that and the database through to the updateDatabase function to add the new note to the database, then sends to update page. 
app.post('/api/notes', (req, res) => {
  const newNote = req.body
  const renderNote = updateDatabase(newNote, db);
  res.send(renderNote)
})



app.listen(PORT, () =>
    console.info(`Server listening at http://localhost:${PORT}`)
)