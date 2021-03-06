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
  "fasta_file_samples/GeneDetails.txt",
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

app.get("/genes",(req, res) => {
  database.readGenes("complete_gene",(result)=>{
    // console.log(result);
    res.status(200).send(result);
  });
});

app.post("/upload", function (req, res) {
  console.log("upload");

  let data = parseFile.handleFileChosen(req.body.files);
  if (data != null) {
    let details = parseFile.getDetails(gene_details);
    // console.log(details);
    console.log("done");
    database.insert("gene_data", data);
    database.insert("gene_details", details);
    let complete_gene = [];
    for (let k = 0; k < data.length; k++) {
      for (let l = 0; l < details.length; l++) {
        if (data[k]["Location"] == details[l]["Location"]) {
          if (data[k]["correct"] == false) {
            console.log(`Stop codon found in gene ${details[l]["Gene"]}`)
          }
          complete_gene.push({
            ...data[k], ...details[l]
          })
        }
      }
    }
    // console.log(complete_gene[0]);

    database.insert("complete_gene", complete_gene);



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
