const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const parseFile = require("./parseFile");
const app = new express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Got connection");
  res.status(200).send({
    message: "hello"
  });
});

app.post("/upload", function(req, res) {
    console.log("upload");
    //console.log(req.body.files);
    let data = parseFile(req.body.files);
    // console.log(data);

    MongoClient.connect(url, function (err, client) {
      // if (err) throw err;
      const db = client.db("gene");
      var collection = db.collection("gene_data");
      collection.insertMany(data);
      client.close();
  });
});

app.listen(config.PORT, () => {
  console.log(`server started at port : ${config.PORT}`);
});
