const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
const db = require("./db/db.json");
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 3001;



// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });



app.get('/api/notes', (req, res) => {
  res.json(db);
})

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

function deleteNote(id, database){
  console.log("you hit the delete button")
  for (i=0; i<database.length; i++){
    idNum = Number(id)
    console.log("idnum= " + idNum)
    console.log('database= ' + database[i].id)
    if (idNum === database[i].id) {
      console.log("They are equal")
      database.splice(i, 1)
      fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(database, null, 4), (err) => {
        if (err) {
          console.log(err)
        }
      })
      break
    } else {
      console.log("they are not equal")
    }
  }
}

app.delete('/api/notes/:id', (req, res) => {
  noteId = req.params.id
  deleteNote(noteId, db)
  res.send()
})

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  const renderNote = updateDatabase(newNote, db);
  res.send()
})



app.listen(PORT, () =>
    console.info(`Server listening at http://localhost:${PORT}`)
)