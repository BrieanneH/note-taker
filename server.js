//when reworking on this app I used this article to get started again
//https://medium.com/@nnamani.ezinne/simple-note-taking-app-using-node-js-and-ejs-4899321a3342
//

//dependencies 
const express = require("express");
const apiRoutes= require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");
//resolving my route problem with help of this stack overflow page:
//https://stackoverflow.com/questions/34247468/node-error-cannot-find-module-routes


//setting express 
const app = express();
const PORT = process.env.PORT || 8080;


// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);




//begin listening
app.listen(PORT, function() {
 console.log("App listening on PORT" + PORT);

});

