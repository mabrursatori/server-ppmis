const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
var path = require('path');

var cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + "/public"));
// use it before all route definitions
//app.use(cors({origin: 'http://localhost:4200'}));

// var whitelist = ['http://localhost:4200', 'https://ppmis.herokuapp.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions))
app.use(cors())

// simple route
app.get("/", (req, res) => {
  try {
   return res.json({ message: "API PP.MIS created by Mabrur" });
}
catch (error) {
 return res.status(500).send({message: "Try again"})
}
  
});

 require("./app/routes/customer.routes.js")(app);
 require("./app/routes/public.routes.js")(app);
 require("./app/routes/dashboard.routes.js")(app);
 require("./app/routes/slideshow.routes.js")(app);

 const port = process.env.PORT || 5000;

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});