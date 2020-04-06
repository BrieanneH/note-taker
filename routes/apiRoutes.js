//linking the route to the JSON data
let dbJson = require("../db/db.json"); 

module.exports = function (app) {


    app.get("/api/notes", (req, res) => {
        response.json(dbJSON);
    });

//add new items to api
    app.post("/api/notes", function (req, res) {
        console.log("Post Successful!");
        console.log(reponse.req.body);
        dbJSON.push(response.req.body);
        response.end("yes");
       
    });
//deleting items when icon is pressed
    app.delete("/api/notes/:note", function (req, res) {
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
