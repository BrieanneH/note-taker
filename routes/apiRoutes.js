//linking the route to the JSON data
const router =require("express").Router()
const fs =require("fs")
let notes = []

module.exports = function (app) {


    router.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", function(err,data){
            notes = JSON.parse(data)
            console.log(notes)
            return res.json(notes);
        }
    });

//add new items to api
    router.post("/api/notes", function (req, res) {

        let newNote = req.body;
        console.log("newNote", newNote)
        let id =1
        if(notes.length !==0){
         id = notes[notes.length -1] + 1
         }

         newNote= {id,...newNote}
         notes.push(newNote);

        fs.writeFile('db/db.json', JSON.stringify(notes), (err)=>{
            console.log('note completed!')

            res.json(newNote);
        })
       
    });


//deleting items when icon is pressed
    router.delete("/api/notes/:note", function (req, res) {
        console.log("note deleted");
        let newDbJSON = [];
        const thisNoteId = request.params.note;
        //getting the value of the collecton of notes
        const noteToDelete = dbJSON.map(note => {
            if (note.id !== thisNoteID) {
                newDbJSON.push(note);
            }
        });

    dbJSON = newDbJSON;

    reponse.end();
    });

};
