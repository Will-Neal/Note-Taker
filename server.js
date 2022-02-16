const express = require("express")
const app = express()
// const homepage = require("./public/index.html")

const PORT = 3001;

app.get('/', (req, res) => {
    // console.info('get request is good')
    res.send("THIS IS THE HOMEPAGE")
})

app.get('/api/notes', (req, res) => {
    res.send("THIS IS THE NOTES PAGE")
})


app.listen(PORT, () =>
    console.info(`Server listening at http://localhost:${PORT}`)
)