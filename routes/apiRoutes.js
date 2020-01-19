const fs = require("fs")
const path = require("path");

var noteData;

module.exports= function(app){
    fs.readFile("db.json", "utf8", function (err, data) {
        if (err) throw err;
        noteData = JSON.parse(data);
    })

    app.get("/api/notes", function (req, res) {
        res.json(noteData);

    });

    app.post("/api/notes", function (req, res){
        console.log("test");
        var newNote = req.body;
        noteData.push(newNote);
        let parsedata = JSON.stringify(noteData)
        fs.writeFile(path.join('db.json'),parsedata, (err) =>{
            if (err) throw err;
        })
        res.json(noteData);

    });

}
