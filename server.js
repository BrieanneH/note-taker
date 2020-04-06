//dependencies 
const express = require("express");
const apiRoutes= require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes")

//setting express 
const app = express();
const PORT = process.env.PORT || 8080;


// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


app.use(apiRoutes)
app.use(htmlRoutes)

//begin listening
app.listen(PORT, function() {
 console.log("App listening on PORT" + PORT);

});

