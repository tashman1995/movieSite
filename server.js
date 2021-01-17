var express = require("express");
var app = express();
var fs = require("fs"),
  express = require("express");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  fs.readFile(__dirname + "/public/index.html", "utf8", function (err, text) {
    res.send(text);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 