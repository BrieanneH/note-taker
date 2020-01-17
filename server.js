const express = require("express");
const app = express();



var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


