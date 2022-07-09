// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/getTimestamp/:date?", function (req, res) {
  let params = req.params.date;
  let time; 

  if (!params) {
    time = new Date();
  } else {
    if (!isNaN(params)) {
      time = new Date(parseInt(params));
    } else {
      time = new Date(params);
    }
  }

  if(time.toString() === "Invalid Date"){
    res.json({ error: "Invalid Date" })
  }else{
    res.json({ unix: time.getTime(),  utc: time.toUTCString() })
  }
     
});

// listen for requests :)
var listener = app.listen(2500, function () {
  console.log("Your app is listening on port " + 2500);
});
