const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const parseFile = require("./parseFile");
const database = require('./database');
const app = new express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Got connection");
  res.status(200).send({
    message: "hello"
  });
});

app.post("/upload", function (req, res) {
  console.log("upload");
  //console.log(req.body.files);
  let data = parseFile(req.body.files);
  // console.log(data);
  database.insert("gene_data", data);
});

app.listen(config.PORT, () => {
  console.log(`server started at port : ${config.PORT}`);
});