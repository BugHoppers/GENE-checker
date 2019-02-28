const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const parseFile = require("./parseFile");
const database = require('./database');
const app = new express();
const fs = require('fs');
const gene_details = fs.readFileSync('fasta_file_samples/GeneDetails.txt.txt', 'utf8');

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Got connection");
  res.status(200).send({
    message: "hello"
  });
});

app.post("/upload", function (req, res) {
  console.log("upload");
  
  let data = parseFile.handleFileChosen(req.body.files);
  let details = parseFile.getDetails(gene_details);
  console.log(details);
  database.insert("gene_data", data);
  database.insert("gene_details", details);
});

app.listen(config.PORT, () => {
  console.log(`server started at port : ${config.PORT}`);
});