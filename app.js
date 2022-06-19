var express = require("express");
let fs = require("fs");
var cors = require("cors");
let bodyParser = require("body-parser");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Hello World!");
});
// get file from database
app.get("/:file", function (req, res) {
  var file = req.params.file;
  res.sendFile(__dirname + "/" + file);
});

// update file in database
app.post("/:file", function (req, res) {
  var file = req.params.file;
  var data = req.body;
  res.send("Updated " + file + " with " + data);
  //   write file to database
  fs.writeFile(file, JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
