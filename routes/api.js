var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs');

router.get('/', ((req, res) => {
    res.render("index.ejs")
}))

const url = "http://localhost:3000"

router.get('/random', verifyAuth, ((req, res) => {
    var files = fs.readdirSync(path.join(__dirname, '..', 'memes'))
    /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
    let chosenFile = files[Math.floor(Math.random() * files.length)]
    res.json({
        imageURL: `${url}/${chosenFile}`,
        imageNAME: `${chosenFile}`
    })
}))

router.get('/get/:meme', verifyAuth, ((req, res, next) => {
    var files = fs.readdirSync(path.join(__dirname, '..', 'memes'))
    if(files.includes(req.params.meme)) {
        res.json({
            imageURL: `${url}/${req.params.meme}`,
            imageNAME: `${req.params.meme}`
        })
    } else {
        res.json({
            "message": "that meme wasnt found"
        })
    }
}))

function verifyAuth(req, res, next) {
    const header = req.header('authorization');
    if(header !== undefined) {
        const token = header.split(' ');
        if(token[0] !== undefined) {
            if(token[0] !== 'Bearer') {
                res.status(403).json({
                    "message": "Invalid bearer token."
                });
            }
        } else {
            res.status(403).json({
                "message": "Missing bearer token."
            });
        }
        const key = token[1];
        if(key !== undefined) {
            if(key === "RANDOM FUCKING KEY") next();
            else {
                res.status(403).json({
                    "message": "Invalid API Key."
                });
            }
        } else {
            res.status(403).json({
                "message": "Missing API Key."
            });
        }
    } else {
        res.status(403).json({
            "message": "Missing auth header."
        });
    }
}

module.exports = router;