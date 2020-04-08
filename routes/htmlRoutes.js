// dependencies

const router = require("express").Router()
const path = require("path");

//routes
   // HTML GET requests
   router.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname,"public/notes.html"));
   })


   // Default to home page
   router.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "public/index.html"));
   })


module.exports = router