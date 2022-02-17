const express = require("express");
const fs = require("fs")
const path = require("path");
const app = express();
//app.use(express.static(path.join(__dirname, 'public')));
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
    return newNote
}

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  const renderNote = updateDatabase(newNote, db);
  res.json(renderNote);
    // const newNote = req.body;
    // newNote.id = Math.floor(Math.random() * 100000000);
      // Obtain existing
      // fs.readFile('./db/db.json', 'utf8', (err, data) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     // Convert string into JSON object
      //     const parsedNotes = JSON.parse(data);
  
      //     // Add a new note
      //     parsedNotes.push(newNote);
  
          
      //     fs.writeFile(
      //       './db/db.json',
      //       JSON.stringify(parsedNotes, null, 4),
      //       (writeErr) =>
      //         writeErr
      //           ? console.error(writeErr)
      //           : console.info('Successfully updated database!')
      //           );


      //   }
      // });

})



app.listen(PORT, () =>
    console.info(`Server listening at http://localhost:${PORT}`)
)