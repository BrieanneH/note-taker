//dependencies 
const express = require("express");

//setting express 
const app = express();
const PORT = process.env.PORT || 8080;


// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//creating routes 
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//begin listening
app.listen(PORT, function() {
 console.log("App listening on PORT" + PORT);

});

