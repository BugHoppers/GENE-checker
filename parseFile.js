handleFileChosen = contents => {
  let details = [];
  contents = contents.split(">");
  if (contents.length > 1) {
    for (let i = 1; i < contents.length; i++) {
      if (contents[i].includes("Reverse")) {
        split_term = "Reverse";
      } else if (contents[i].includes("Forward")) {
        split_term = "Forward"
      }
      else {
        alert("Not a fasta file");
      }
      let content = contents[i].split(split_term);
      details.push({ "meta": content[0], "gene": content[1] })
    }
  } else {
    alert("It is not a fasta file");
  }
  // console.log(details[1]);
  return details;
};

getDetails = data => {
  let gene_details = [];
    var lines = data.split(/\n/);
    for (let i = 3; i < lines.length; i++) {
      let x = lines[i].split(/\t/);
      gene_details.push({ "Location": x[0], "Strand": x[1], "Length": x[2], "PID": x[3], "Gene": x[4], "Synonym": x[5], "Code": x[6], "COG": x[7], "Product": x[8]})
    }
  // console.log(gene_details[1]);
  return gene_details;
}

module.exports = { handleFileChosen, getDetails }