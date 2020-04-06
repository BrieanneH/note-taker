// dependencies
const path = require("path");

//routes
module.exports = function(app) {
   // HTML GET requests
   app.get("/notes", function(req, res) {
      response.sendFile(path.join(__dirname, "../public/notes.html"));
   });

   // connecting css
   app.get("/assets/css/styles.css", function(req, res) {
      response.sendFile(
         path.join(__dirname, "../public/assets/css/styles.css") 
      );
   });

   // connecting JS
   app.get("/assets/js/index.js", function(req, res) {
      response.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
   });

   // Default to home page
   app.get("*", function(req, res) {
      response.sendFile(path.join(__dirname, "../public/index.html"));
   });
};