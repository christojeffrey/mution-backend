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
app.post("/addConnectedWallet/:username", function (req, res) {
  var username = req.params.username;
  var newwallet = req.body;
  res.send("Updated " + username + " with " + JSON.stringify(newwallet));

  // read from database
  fs.readFile("database.json", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var json = JSON.parse(data);
      // iterate through json, find where username is equal to the username in the url
      for (var i = 0; i < json.length; i++) {
        if (json[i].username == username) {
          // update the json
          // append data to the json
          console.log("json");
          console.log(json);
          json[i].connectedWallet.push(newwallet);
          //   write file to database
          console.log("json");
          console.log(json);
          fs.writeFile("database.json", JSON.stringify(json), function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          });
        }
      }
    }
  });
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
