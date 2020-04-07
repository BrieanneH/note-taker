// dependencies
const path = require("path");
const router = require("express").Router()

//routes
   // HTML GET requests
   router.get("/notes", function(req, res) {
      response.sendFile(path.join(__dirname, "../public/notes.html"));
   });


   // Default to home page
   app.get("*", function(req, res) {
      response.sendFile(path.join(__dirname, "../public/index.html"));
   });


module.exports 