var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res) {
  const url = `http://arkiv.abakus.no/${req.body.text.replace(' ', '+')}`
  res.json({
    response_type: "in_channel",
    text: url
  });
});

var server = app.listen(7363, function () {
  console.log("Listening on port %s...", server.address().port);
});
