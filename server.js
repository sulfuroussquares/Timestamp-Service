// server.js
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
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Route parameters are named segments of the URL, delimited by slashes (/).
// Each segment captures the value of the part of the URL which matches its position.
// The captured values can be found in the req.params object.
app.get("/api/timestamp/:timestamp", function(req, res) {
  let convertedUtcTime, unixTime;
  let rawTime = new Date(req.params.timestamp);

  // validate: does this look like a date?
  var valid = rawTime > 0;

  if (valid) {
    convertedUtcTime = new Date(req.params.timestamp).toUTCString();
    unixTime = Math.floor(new Date(rawTime) / 1000);
    res.json({
      unix: unixTime,
      utc: convertedUtcTime,
    });
  } else {
    unixTime = parseInt(req.params.timestamp, 10);
    convertedUtcTime = new Date(unixTime).toUTCString();
    res.json({
      unix: unixTime,
      utc: convertedUtcTime
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
