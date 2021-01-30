const express = require('express');
const apiRoute = require('./routes/api')
const path = require('path')
const fs = require('fs')
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('memes'))
app.use('/api', apiRoute)

app.listen(3000, () => {
    console.log("api started on port 3000")
})

app.get('/', ((req, res) => {
    res.render("index.ejs")
}))