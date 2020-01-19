var path = require("path");

module.exports = function(app){

    app.get("/notes", function(req,res){
        res.sendFile(path.join(__dirname, "/notes.html"));
    });

    app.get("../assets/index.js", function (req, res){
        res.sendFile(path.join(__dirname,"/assets/index.js"))

    });

    app.get("../assets/style.css", function (req, res){
        res.sendFile(path.join(__dirname,"/assets/style.css"))

    });

    app.get("*", function (req, res){
        res.sendFile(path.join(__dirname,"/index.html"));

    });


    
}