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

// An empty date parameter should return the current time in a JSON object with a unix key

app.get("/api/timestamp/", function(req, res) {
  let convertedUtcTime, unixTime;
  convertedUtcTime = new Date().toUTCString();
  let rawTime = new Date();
  res.json({
    unix: Math.floor(new Date(convertedUtcTime) / 1),
    utc: convertedUtcTime
  });
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
    unixTime = Math.floor(new Date(rawTime) / 1);
    res.json({
      unix: unixTime,
      utc: convertedUtcTime
    });
  } else {
    unixTime = parseInt(req.params.timestamp, 10);
    // verify we are handling a valid unix date
    if (unixTime > 0) {
      convertedUtcTime = new Date(unixTime).toUTCString();
      res.json({
        unix: unixTime,
        utc: convertedUtcTime,
        rawtime: rawTime
      });
    }
    else {
      res.json({
        error: "Invalid Date"
      })
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
