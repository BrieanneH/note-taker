//cleaning out code, removing functions that should be placed elsewhere


//linking the route to the JSON data
const router =require("express").Router()
//const fs =require("fs")
const notes = require("../db/notes.js");

//get, post, and delete our notes
    router.get("/notes", (req, res) => {
        notes.getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));




    })

//add new items to api
    router.post("/notes", function (req, res) {
        notes.addNotes(req.body)
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));

     
     })
       
   


//deleting items when icon is pressed
    router.delete("/notes/:id", function (req, res) {
       notes.removeNote(req.params.id)
       .then(()=> res.json({ok: true}))
       .catch(err => res.status(500).json(err));

    


    })


module.exports = router; 