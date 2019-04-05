handleFileChosen = contents => {
  let details = [];
  contents = contents.split(">");
  console.log(contents.length);
  if (contents.length > 1) {
    for (let i = 1; i < contents.length; i++) {
      if (contents[i].includes("genome")) {
        split_term = "genome";
      } else if (contents[i].includes("Reverse")) {
        split_term = "Reverse";
      } else if (contents[i].includes("Forward")) {
        split_term = "Forward";
      } else {
        console.log("Not a fasta file");
      }
      let content = contents[i].split(split_term);
      if (content[1].match("[^ATGC]*")[0].length > 3) {
        console.log(content[1].match("[^ATGC]*")[0])
        console.log("Error in gene");
        return null;
      } else {
        content[1] = content[1].replace(new RegExp('\r?\n', 'g'), '');
        len = content[1].length;
        countA = (content[1].match(/A/g) || []).length;
        countT = (content[1].match(/T/g) || []).length;
        countG = (content[1].match(/G/g) || []).length;
        countC = (content[1].match(/C/g) || []).length;
        per = (countG + countC) * 100.0 / len;
        loc = (content[0].substring(content[0].indexOf(":") + 1)).split(" ")[0];
        if (loc[0] == 'c') {
          let temp = loc.split("-");
          loc = temp[1] + "-" + temp[0].slice(1);
        }
        if (loc.indexOf(",")!=-1) {
          details.push({
            meta: content[0],
            range: loc,
            gene: content[1],
            count_A: countA,
            count_T: countT,
            count_G: countG,
            count_C: countC,
            length: len,
            percentage_G_C: per
          });
        }
      }
    }
  } else {
    console.log("It is not a fasta file");
  }
  // console.log(details[1]);
  return details;
};

getDetails = data => {
  let gene_details = [];
  var lines = data.split(/\n/);
  for (let i = 3; i < lines.length; i++) {
    let x = lines[i].split(/\t/);
    gene_details.push({
      Location: x[0],
      Strand: x[1],
      Length: x[2],
      PID: x[3],
      Gene: x[4],
      Synonym: x[5],
      Code: x[6],
      COG: x[7],
      Product: x[8]
    });
  }
  // console.log(gene_details[1]);
  return gene_details;
};

module.exports = {
  handleFileChosen,
  getDetails
};