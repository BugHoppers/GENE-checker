const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const parseFile = require("./parseFile");
const database = require("./database");
const app = new express();
const fs = require("fs");
const csvWriter = require("csv-write-stream");
const writer = csvWriter();
const gene_details = fs.readFileSync(
  "fasta_file_samples/GeneDetails.txt.txt",
  "utf8"
);

writer.pipe(
  fs.createWriteStream("./gene.csv"),
  { flags: "a" }
);

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) => {
  console.log("Got connection");
  res.status(200).send({
    message: "hello"
  });
});

app.post("/upload", function(req, res) {
  console.log("upload");

  let data = parseFile.handleFileChosen(req.body.files);
  if (data != null) {
    let details = parseFile.getDetails(gene_details);
    // console.log(details);
    console.log("done");
    database.insert("gene_data", data);
    database.insert("gene_details", details);

    // writing to file
    for (const gene of data) {
      writer.write(gene);
    }
    writer.end();
  }
});

app.listen(config.PORT, () => {
  console.log(`server started at port : ${config.PORT}`);
});
